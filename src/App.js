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
      <div className="document">
        <header className="App-header">
          <span>&nbsp;</span>
          <KeyboundInput keybinding="⌘K" type="text" />
          <span>&nbsp;</span>
        </header>
        <main>
          <aside>
            <h2 className="title">⌘L to focus</h2>
            <KeyboundList keybinding="⌘L">
              <button onClick={() => this.setState({ view: "A" })}>Page A</button>
              <button onClick={() => this.setState({ view: "B" })}>Page B</button>
              <button onClick={() => this.setState({ view: "C" })}>Page C</button>
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
