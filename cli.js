#!/usr/bin/env node

const cmd = require("node-cmd");
const [, , ...args] = process.argv;
const commandToRun = `cd ${process.cwd()} && npm version patch && npm publish && git push`;

// Print "PaPuPu" art
console.info(`
██████╗  █████╗ ██████╗ ██╗   ██╗██████╗ ██╗   ██╗
██╔══██╗██╔══██╗██╔══██╗██║   ██║██╔══██╗██║   ██║
██████╔╝███████║██████╔╝██║   ██║██████╔╝██║   ██║
██╔═══╝ ██╔══██║██╔═══╝ ██║   ██║██╔═══╝ ██║   ██║
██║     ██║  ██║██║     ╚██████╔╝██║     ╚██████╔╝
╚═╝     ╚═╝  ╚═╝╚═╝      ╚═════╝ ╚═╝      ╚═════╝
Running: ${commandToRun}
`);

cmd.get(commandToRun, (err, data, stderr) => {
  if (err) {
    if (err.message.includes("authorize this machine")) {
      return console.error(
        "You are not loggedin. Please run `npm login` and try again."
      );
    } else if (err.message.includes("working directory not clean")) {
      return console.error(
        "Your git working directory is not clean. Please commit or stash your changes and try again."
      );
    } else {
      console.error("Error running papupu:");
      throw err;
    }
  }
  console.log("Success, published new version: ", data);

});
