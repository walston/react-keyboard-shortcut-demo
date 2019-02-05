import { useEffect } from "react";
import { add, remove } from "../utility/shortcut-manager";

export default function useKeybindingToFocus(keybinding, ref) {
  function focus() {
    try {
      ref.current.focus();
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    add(keybinding, focus);
    return () => {
      console.log("killing binding", keybinding);
      remove(keybinding);
    };
  }, [ref]);
}
