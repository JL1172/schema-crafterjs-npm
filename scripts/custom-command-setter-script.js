const fs = require('fs');
function add_custom_command() {
  const packageJson = require("../../../package.json");
  const jsonPath = "../../../package.json";
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts["mock-build"] =
    "cd node_modules/schemacrafterjs/scripts && node generate-folder-script.js";
  fs.writeFileSync(jsonPath, JSON.stringify(packageJson, null, 2));
}
module.exports = add_custom_command;
