import React, { Component } from "react";
import KeyboundInput from "./components/KeyboundInput";
import KeyboundList from "./components/KeyboundList";
import "./App.css";
import A from "./routes/A";
import B from "./routes/B";
import C from "./routes/C";
import KeyWatcher from "./utility/keyboard-watcher";

class App extends Component {
  state = { counter: 0, view: "A" };
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <header className="App-header">
          <KeyboundInput keybinding="⌘K" type="text" />
        </header>
        <main>
          <aside>
            <KeyboundList keybinding="⌘L">
              <div className="title">⌘L to focus</div>
              <li>
                <button onClick={() => this.setState({ view: "A" })}>A</button>
              </li>
              <li>
                <button onClick={() => this.setState({ view: "B" })}>B</button>
              </li>
              <li>
                <button onClick={() => this.setState({ view: "C" })}>C</button>
              </li>
            </KeyboundList>
          </aside>
          <article>
            {this.state.view === "A" && <A />}
            {this.state.view === "B" && <B />}
            {this.state.view === "C" && <C />}
          </article>
        </main>
        <KeyWatcher />
      </div>
    );
  }
}

export default App;
