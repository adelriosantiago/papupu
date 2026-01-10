#!/usr/bin/env node

const cmd = require("node-cmd");
const [, , ...args] = process.argv;
console.log("Running papupu with args:", args);
const commandToRun = `cd ${process.cwd()} && npm version patch && npm publish ${args[0] ? `--otp=${args[0]}` : ""} && git push`;

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

// TODO: Add "operation requires a one-time password"
// TODO: Add npm error You can provide a one-time password by passing --otp=<code> to the command you ran.

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
    } else if (err.message.includes("not currently on a branch")) {
      return console.error(
        "Publishing done but \"git push\" failed because you are not currently on a branch. Please checkout a branch and run `git push` manually."
      );
    } else if (err.message.includes("token expired")) {
      return console.error(
        "Your npm token has expired. Please run `npm login` to refresh your token and try again."
      );
    } else {
      console.error("Error running papupu:");
      throw err;
    }
  }
  console.log("Success, published new version: ", data);

});
