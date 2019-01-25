const net = require("net");
const { spawn } = require("child_process");

if (!process.env.BROWSER) process.env.BROWSER = "none";
if (!process.env.PORT || !(parseInt(process.env.PORT) > 0))
  process.env.PORT = "3000";
if (!process.env.ELECTRON_START_URL)
  process.env.ELECTRON_START_URL = `http://localhost:${process.env.PORT}`;

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

let killing = {};
function kill(child, name) {
  return new Promise(resolve => {
    if (child.exitCode != null || child.signalCode != null)
      killing[name] = true;

    if (killing[name]) return resolve([child.exitCode, child.signalCode]);
    killing[name] = true;
    child.on("exit", (code, signal) => resolve([code, signal]));
    try {
      process.kill(-child.pid, "SIGTERM");
    } catch (e) {}
  });
}

let electron;
let react;
let alreadyQuitting = false;

function quit() {
  if (alreadyQuitting) return;
  alreadyQuitting = true;

  console.log("QUITTING");

  const killing = [];
  if (electron) killing.push(kill(electron, "ELECTRON"));
  if (react) killing.push(kill(react, "REACT"));

  return Promise.all(killing).catch(errors => {
    console.log(errors);
    process.exit(1);
  });
}

function connect(child, name) {
  child.stdout.on("data", log("stdout", name));
  child.stderr.on("data", log("stderr", name));
  child.on("exit", quit);
}

react = spawn("npm", ["run", "react"], {
  env: process.env,
  detached: true,
  stdio: ["ignore", "pipe", "pipe"]
});
connect(
  react,
  "REACT"
);

const webpack_dev_server = new net.Socket();

function connectionSuccess() {
  console.log("starting electron");
  electron = spawn("npm", ["run", "electron"], {
    env: process.env,
    detached: true,
    stdio: ["ignore", "pipe", "pipe"]
  });
  connect(
    electron,
    "ELECTRON"
  );
}

const port = parseInt(process.env.PORT);
webpack_dev_server.connect({ port });
webpack_dev_server.on("connect", connectionSuccess);
webpack_dev_server.on("error", () => {
  setTimeout(() => webpack_dev_server.connect({ port }), 300);
});

process.on("SIGINT", quit);
process.on("SIGTERM", quit);
process.on("SIGQUIT", quit);
