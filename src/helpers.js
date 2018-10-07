const execSync = require('child_process').execSync;

const helpers = {};

const i18n = (key, options) => {
  options = options || {};
  options.hash = options.hash || {};

  if (!options.data.root.translations) {
    throw "{{i18n}} helper: no translations in root context.";
  }

  const translations = options.data.root.translations;

  if (typeof key !== "string") {
    throw "{{i18n}} helper: invalid key. keys must be a string.";
  }

  if (typeof translations[key] === "undefined") {
    return key;
  }

  return translations[key];
};


const linechart = (data, options) => {
  options = options || {};
  options.hash = options.hash || {};

  const out = execSync(`python3 ./src/linechart.py`, {
    input: JSON.stringify(data)
  });

  return out.toString();
};

helpers.linechart = linechart;
helpers.i18n = i18n;
module.exports = helpers;
