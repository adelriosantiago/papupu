#!/usr/bin/env node

const cmd = require("node-cmd");
const [, , ...args] = process.argv;
const commandToRun = `cd ${process.cwd()} && npm version patch && npm publish && git push`;

console.log("Running: ", commandToRun);

cmd.get(commandToRun, (err, data, stderr) => {
  if (err) {
    if (err.message.includes("authorize this machine")) {
      console.error(
        "You are not loggedin. Please run `npm login` and try again."
      );
      return;
    } else {
      console.error("Error running papupu:");
      throw err;
    }
  }
  console.log("Success, published new version: ", data);
});
