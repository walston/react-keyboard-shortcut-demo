const spawn = require("child_process").spawn;

const first = spawn("top", { env: process.env });
first.on("exit", () => console.log("first", "EXITING"));
const second = spawn("top", { env: process.env });
second.on("exit", () => console.log("second", "EXITING"));

function kill(child) {
  return new Promise((resolve, reject) => {
    child.on("exit", code => {
      if (code > 0) {
        console.log(child.pid, "error");
        reject(code);
      } else {
        console.log(child.pid, "success");
        resolve(0);
      }
    });
    child.kill();
  });
}

process.on("SIGINT", () => {
  Promise.all([kill(first), kill(second)])
    .then(function() {
      process.exit(0);
    })
    .catch(function() {
      console.error("OOPS", arguments);
      process.exit(1);
    });
});
