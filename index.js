let fs = require("fs");
const prompt = require("prompt");
const Papa = require("papaparse");
const { format, parse } = require("lua-json");

// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  // console.log("Usage: node " + process.argv[1] + " FILENAME");
  prompt.message = null;
  prompt.start();
  prompt.get(
    [
      { name: "input", description: "Input Directory" },
      { name: "output", description: "Output Directory (defaults to input)" }
    ],
    function(err, result) {
      if (err) return console.log(err);
      start(
        stripQuotes(result.input),
        stripQuotes(result.output) || stripQuotes(result.input)
      );
    }
  );
} else {
  start(
    stripQuotes(process.argv[2]),
    stripQuotes(process.argv[3]) || stripQuotes(process.argv[2])
  );
}

function stripQuotes(input) {
  return input.replace(/['"]+/g, "");
}

function start(watchDir, outputDir) {
  // Convert entire directory
  fs.readdir(watchDir, function(err, files) {
    if (err) {
      return console.log(err);
    }

    files.forEach(function(filename) {
      convertAndSave(filename, watchDir, outputDir);
    });
  });

  // Continue to watch for changes
  fs.watch(watchDir, function(eventType, filename) {
    setTimeout(function() {
      convertAndSave(filename, watchDir, outputDir);
    }, 1000);
  });
}

function convertText(text) {
  return format(Papa.parse(text, { header: true }).data);
}

function convertAndSave(filename, watchDir, outputDir) {
  if (filename.substr(filename.length - 4) === ".csv") {
    const csvText = fs.readFileSync(watchDir + "\\" + filename, "utf8");
    const newPath =
      outputDir + "\\" + filename.substr(0, filename.length - 4) + ".lua";

    fs.writeFileSync(newPath, convertText(csvText));

    console.log("Converted saved to", newPath);
  }
}
