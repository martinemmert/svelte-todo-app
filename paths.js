const path = require("path");

module.exports = [
  { find: "~actions", replacement: path.resolve(__dirname, "src", "actions") },
  { find: "~components", replacement: path.resolve(__dirname, "src", "components") },
  { find: "~i18n", replacement: path.resolve(__dirname, "src", "i18n") },
  { find: "~stores", replacement: path.resolve(__dirname, "src", "stores") },
  { find: "~utils", replacement: path.resolve(__dirname, "src", "utils") },
  { find: "~views", replacement: path.resolve(__dirname, "src", "views") },
];
