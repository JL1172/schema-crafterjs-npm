import generate_mock_folder from "./mock-folder-script";
import fs from "node:fs";

export default function add_custom_command() {
    const packageJson = require("../../../package.json");
    packageJson.scripts = packageJson.scripts || {};
    packageJson.scripts["mock-build"] = "cd node_modules/schemacrafterjs/scripts && node mock-folder-script.js";
    fs.writeFileSync(packageJson, JSON.stringify(packageJson, null, 2));
}