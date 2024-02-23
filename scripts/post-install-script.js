"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline-sync");
const mock_folder_script_1 = require("./mock-folder-script");
const custom_command_setter_script_1 = require("./custom-command-setter-script");
async function package_builder() {
    try {
        console.log("This Is A Post-Installation Question.\n");
        const result = readline.keyInYN("Do You Want To Generate A Mock File Showing An Example Of How To Use This Package?");
        if (!result) {
            console.log("Note, If You Want To Add This Option Later, Run `npm run mock-build`");
        }
        else {
            (0, mock_folder_script_1.default)();
        }
    }
    catch (err) {
        console.log(err);
    }
    finally {
        (0, custom_command_setter_script_1.default)();
    }
}
package_builder();
//# sourceMappingURL=post-install-script.js.map