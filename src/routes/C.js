import React from "react";
import KeyboundInput from "../components/KeyboundInput";

export default function(props) {
  return (
    <div>
      <p>C</p>
      <p>
        <KeyboundInput keybinding="⌘⇧G" />
      </p>
    </div>
  );
}
