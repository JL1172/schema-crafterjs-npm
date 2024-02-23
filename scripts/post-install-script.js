const { keyInYNStrict } = require("readline-sync");
const generate_mock_folder = require("./mock-folder-script");
const add_custom_command = require("./custom-command-setter-script");

console.log("This Is A Post-Installation Question.\n");
const result = keyInYNStrict(
  "Do You Want To Generate A Mock File Showing An Example Of How To Use This Package?"
);
if (!result) {
  console.log(
    "Note, If You Want To Add This Option Later, Run `npm run mock-build`"
  );
  add_custom_command();
} else if (result) {
  generate_mock_folder();
  add_custom_command();
}

package_builder();
