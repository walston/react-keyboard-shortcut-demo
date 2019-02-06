import React, { useEffect, useRef, useState, Children } from "react";
import { focus } from "./useKeybindingToFocus";
import { add, remove } from "../utility/shortcut-manager";

/** @typedef {Object} KeyboardListProps
 * @property {string} keybinding
 * @property {any[]} children
 */
/**
 * Modifies `ref` of `props.children`.
 * @param {KeyboardListProps} props
 */
export default function KeyboundList({ keybinding, children, ...props }) {
  const refs = Children.map(children, () => useRef(null));
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    function blur() {
      setSelected(null);
    }

    if (selected == null) {
      add(keybinding, () => {
        focus(refs[0]);
        setSelected(0);
      });
      return () => remove(keybinding);
    } else {
      refs[selected].current.addEventListener("blur", blur);
      if (selected > 0) {
        add("arrowup", () => {
          focus(refs[selected - 1]);
          setSelected(selected - 1);
        });
      }
      if (selected < children.length - 1) {
        add("arrowdown", () => {
          focus(refs[selected + 1]);
          setSelected(selected + 1);
        });
      }
      return () => {
        remove("arrowdown");
        remove("arrowup");
        refs[selected].current.removeEventListener("blur", blur);
      };
    }
  });

  return (
    <ul {...props}>
      {Children.map(children, (child, i) => {
        return <li>{React.cloneElement(child, { ref: refs[i] })}</li>;
      })}
    </ul>
  );
}
