const path = require("path");

const process = (src, filename, config, options) =>
  "module.exports = " + JSON.stringify(path.basename(filename));

module.exports = { process };
