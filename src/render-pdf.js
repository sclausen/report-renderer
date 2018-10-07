#!/usr/bin/env node

const Handlebars = require('handlebars');
const fs = require('fs');
const process = require('process');
const execSync = require('child_process').execSync;
const helpers = require('./helpers');

Object
  .keys(helpers)
  .forEach((helperName) => {
    Handlebars.registerHelper(helperName, helpers[helperName]);
  });

var stdin = process.stdin;

stdin.resume();
stdin.setEncoding('utf8');

var rawData = '';

stdin.on('data', (chunk) => {
  rawData += chunk;
});

stdin.on('error', (e) => {
  process.stderr.write(e);
});

stdin.on('end', () => {
  try {
    const parsedData = JSON.parse(rawData);
    try {
      const filename = `./templates/${parsedData.templateUUID}/template.html`;
      const templateString = fs.readFileSync(filename, {
        encoding: 'utf8'
      });

      var template = Handlebars.compile(templateString);
      const html = template(parsedData.context);

      fs.writeFileSync(filename, html)

      const buffer = execSync(`/usr/bin/xvfb-run /usr/bin/wkhtmltopdf -B 0 -L 0 -R 0 -T 0 -s A4 ${filename} - | cat`);

      process.stdout.write(buffer);
    } catch (e) {
      console.error(e.toString());
      process.exit();
    }
  } catch (e) {
    console.error(e.toString());
    process.exit();
  }
});
