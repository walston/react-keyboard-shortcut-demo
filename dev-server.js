const net = require("net");
const colors = require("colors");
const { spawn } = require("child_process");

if (!process.env.BROWSER) process.env.BROWSER = "none";
if (!process.env.PORT || !(parseInt(process.env.PORT) > 0))
  process.env.PORT = "3000";
if (!process.env.ELECTRON_START_URL)
  process.env.ELECTRON_START_URL = `http://localhost:${process.env.PORT}`;

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

  console.log(colors.red("QUITTING"));

  const killing = [];
  if (electron) killing.push(kill(electron, "ELECTRON"));
  if (react) killing.push(kill(react, "REACT"));

  return Promise.all(killing).catch(errors => {
    console.log(errors);
    process.exit(1);
  });
}

function connect(child, name, color) {
  function Register(prefix) {
    let line = Buffer.from(prefix);

    this.push = function push(data) {
      line = Buffer.concat([line, data]);
    };

    this.flush = function flush() {
      const old_line = Buffer.from(line);
      line = Buffer.from(prefix);
      return old_line;
    };
  }

  function slice(reg, print) {
    return function(buff) {
      let i = buff.indexOf("\n");
      while (i !== -1) {
        reg.push(buff.slice(0, i + 1));
        print(reg.flush());
        buff = buff.slice(i + 1);
        i = buff.indexOf("\n");
      }
      reg.push(buff);
    };
  }

  let out = new Register(color(`${name} ::`));
  let err = new Register(color(`${name} !!`));

  child.stdout.on("data", slice(out, line => process.stdout.write(line)));
  child.stderr.on("data", slice(err, line => process.stderr.write(line)));

  child.on("exit", quit);
}

react = spawn("npm", ["run", "react"], {
  env: process.env,
  detached: true,
  stdio: ["ignore", "pipe", "pipe"]
});
connect(
  react,
  "REACT",
  colors.cyan
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
    "ELECTRON",
    colors.magenta
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
