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

cmd.run(commandToRun, (err, data, stderr) => {
  if (err) {
    if (err.message.includes("authorize this machine")) {
      return console.error(
        "You are not loggedin. Please run `npm login` and try again."
      );
    } else if (err.message.includes("working directory not clean")) {
      return console.error(
        "Your git working directory is not clean. Please commit or stash your changes and try again."
      );
    } else if (err.message.includes("not currently on a branch.")) {
      return console.error(
        "Publishing done but \"git push\" failed because you are not currently on a branch. Please checkout a branch and run `git push` manually."
      );
    } else {
      console.error("Error running papupu:");
      throw err;
    }
  }
  console.log("Success, published new version: ", data);

});
