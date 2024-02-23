"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
function add_custom_command() {
  const packageJson = require("../../../package.json");
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts["mock-build"] =
    "cd node_modules/schemacrafterjs/scripts && node mock-folder-script.js";
  fs.writeFileSync(
    "../../../package.json",
    JSON.stringify(packageJson, null, 2)
  );
}
exports.default = add_custom_command;
//# sourceMappingURL=custom-command-setter-script.js.map

