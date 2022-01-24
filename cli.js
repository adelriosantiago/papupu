#!/usr/bin/env node

const cmd = require("node-cmd");
const [, , ...args] = process.argv;
const commandToRun = `cd ${process.cwd()} && npm version patch && npm publish && git push`;

console.log("Running: ", commandToRun);

cmd.get(commandToRun, function (err, data, stderr) {
  if (err) {
    console.log("Unable to run commands")
    throw err
  }
  console.log("Sucess, published new version: ", data);
});
