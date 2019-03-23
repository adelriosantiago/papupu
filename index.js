var cmd=require('node-cmd');

const currentPath = __dirname;
const commandToRun = `cd ${ currentPath } && npm version patch && npm publish && git push`;

console.log("Running: ", commandToRun);
cmd.get(
  commandToRun,
  function(err, data, stderr) {
    console.log("Done: ", err, data, stderr);
  }
);