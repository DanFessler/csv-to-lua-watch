let fs = require("fs");
const Papa = require("papaparse");
const { format, parse } = require("lua-json");

// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log("Usage: node " + process.argv[1] + " FILENAME");
  process.exit(1);
}

const watchDir = process.argv[2];
const outputDir = process.argv[3] || watchDir;

// Convert entire directory
fs.readdir(watchDir, function(err, files) {
  if (err) {
    return console.log(err);
  }

  files.forEach(function(filename) {
    convertAndSave(filename);
  });
});

// Continue to watch for changes
fs.watch(watchDir, function(eventType, filename) {
  convertAndSave(filename);
});

function convertText(text) {
  return format(Papa.parse(text, { header: true }).data);
}

function convertAndSave(filename) {
  if (filename.substr(filename.length - 4) === ".csv") {
    const csvText = fs.readFileSync(watchDir + "\\" + filename, "utf8");
    const newPath =
      outputDir + "\\" + filename.substr(0, filename.length - 4) + ".lua";

    fs.writeFileSync(newPath, convertText(csvText));

    console.log("Converted saved to", newPath);
  }
}
