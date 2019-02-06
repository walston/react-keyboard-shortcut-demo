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
            <h5 className="title">⌘L to focus</h5>
            <KeyboundList keybinding="⌘L">
              <button onClick={() => this.setState({ view: "A" })}>A</button>
              <button onClick={() => this.setState({ view: "B" })}>B</button>
              <button onClick={() => this.setState({ view: "C" })}>C</button>
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
