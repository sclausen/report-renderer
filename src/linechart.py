import pygal
import tempfile
import sys
import json

from pygal.style import LightenStyle
dark_lighten_style = LightenStyle('#CE2B37')

data = json.load(sys.stdin)

line_chart = pygal.Line(pretty_print=True, disable_xml_declaration=True, strict=True, style=dark_lighten_style)

if "title" in data:
    line_chart.title = data["title"]

if "x_labels" in data:
    line_chart.x_labels = data["x_labels"]

for series in data["series"]:
    line_chart.add(series["label"], series["data"])

file = tempfile.NamedTemporaryFile()

output_file_name = file.name + '.png'
output = output_file_name
line_chart.render_to_png(output_file_name)

# output_file_name = file.name+'.svg'
# output = output_file_name
# line_chart.render_to_file(output_file_name)
# output = line_chart.render_data_uri()

# output = line_chart.render(is_unicode=True)

sys.stdout.write(output)
