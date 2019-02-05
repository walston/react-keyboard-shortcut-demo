import React, { useEffect, useState } from "react";

function Key(props) {
  return (
    <span
      {...props}
      style={{
        fontSize: "24px",
        color: "white",
        backgroundColor: "rgba(0,0,0,0.75)",
        borderRadius: "0.2em",
        padding: "0.5em",
        margin: "0.2em"
      }}
    />
  );
}

export default function KeyWatcher() {
  const [keys, setKeys] = useState([]);
  useEffect(() => {
    const watch = event => {
      let down = [];
      if (event.metaKey) down.push(<Key key="cmd">⌘</Key>);
      if (event.ctrlKey) down.push(<Key key="ctrl">⌃</Key>);
      if (event.altKey) down.push(<Key key="alt">⎇</Key>);
      if (event.shiftKey) down.push(<Key key="shift">⇧</Key>);
      down.push(<Key key={event.key}>{event.key.toUpperCase()}</Key>);
      setKeys(down);
    };
    const timeout = window.setTimeout(() => setKeys([]), 1000);
    document.addEventListener("keydown", watch);
    return () => {
      document.removeEventListener("keydown", watch);
      clearTimeout(timeout);
    };
  });

  return (
    <div style={{ position: "absolute", bottom: "16px", right: "0" }}>
      {keys}
    </div>
  );
}
