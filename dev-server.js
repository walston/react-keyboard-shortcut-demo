const net = require("net");
const spawn = require("child_process").spawn;
const port = parseInt(process.env.PORT) - 100 || 3000;

const stdout = process.stdout.write.bind(process.stdout);
const stderr = process.stderr.write.bind(process.stderr);

function log(type, prefix) {
  return function(message) {
    if (type === "stderr") {
      stderr(prefix + " !!!\n");
      stderr(message);
    } else {
      stdout(prefix + " >>>\n");
      stdout(message);
    }
  };
}

function kill(child) {
  return new Promise(resolve => {
    if (child.killed || child.signalCode != null || child.exitCode != null) {
      console.log(child);
      return resolve([child.exitCode, child.signalCode]);
    }
    child.on("exit", (code, sig) => resolve([code, sig]));
    child.kill("SIGTERM");
  });
}

let electron;
let react;

function quit(code) {
  console.log("QUITTING");
  const killing = [];
  if (electron) killing.push(kill(electron));
  if (react) killing.push(kill(react));

  return Promise.all(killing)
    .then(codes => process.exit(0))
    .catch(errors => process.exit(1));
}

function connectReact() {
  react.stdout.on("data", log("stdout", "REACT"));
  react.stderr.on("data", log("stderr", "REACT"));
  react.on("exit", quit);
}

function connectElectron() {
  electron.stdout.on("data", log("stdout", "ELECTRON"));
  electron.stderr.on("data", log("stderr", "ELECTRON"));
  electron.on("exit", quit);
}

react = spawn("npm", ["run", "react"], {
  env: { ...process.env, PORT: port.toString() }
});
connectReact();

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const webpack_dev_server = new net.Socket();

function connectionSuccess() {
  console.log("starting electron");
  electron = spawn("npm", ["run", "electron"], { env: process.env });
  connectElectron();
}

webpack_dev_server.connect({ port });
webpack_dev_server.on("connect", connectionSuccess);
webpack_dev_server.on("error", () => {
  setTimeout(() => webpack_dev_server.connect({ port }), 300);
});

process.on("SIGINT", quit);
process.on("SIGQUIT", quit);
