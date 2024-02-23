import * as readline from "readline-sync";
import generate_mock_folder from "./mock-folder-script";
import add_custom_command from "./custom-command-setter-script";

async function package_builder() {
    try {
        console.log("This Is A Post-Installation Question.\n");
        const result = readline.keyInYNStrict("Do You Want To Generate A Mock File Showing An Example Of How To Use This Package?");
        if (!result) {
            console.log("Note, If You Want To Add This Option Later, Run `npm run mock-build`")
        } else {
            generate_mock_folder();
        }
    } catch (err) {
        console.log(err);
    } finally {
        add_custom_command();
    }
}

package_builder();