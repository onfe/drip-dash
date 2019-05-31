var args = [];
process.argv.forEach((arg) => {
  var matches = /--([^= ]*)(=([^ -=]*))?/.exec(arg);
  if (matches) {
    args.push({ key: matches[1], value: matches[3] });
  }
});

const bodyParser = require("body-parser");
const api = require("../dripdash-server.js");
var collector = false;

if (
    args.find(a => a.key === "collector") &&
    args.find(a => a.key === "collector").value == "internal"
  ) {
  console.log("Using internal data collector.")
  collector = require("../collector-internal.js");
}

console.log(!!collector);

module.exports = app => {
  app.use(bodyParser.json());
  app.use("/api", api);
  if (collector) { app.use("/collect", collector) }
};
