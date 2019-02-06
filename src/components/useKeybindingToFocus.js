import { useEffect } from "react";
import { add, remove } from "../utility/shortcut-manager";

export default function useKeybindingToFocus(keybinding, ref) {
  useEffect(() => {
    add(keybinding, () => focus(ref));
    return () => remove(keybinding);
  }, [ref]);
}

export function focus(ref) {
  try {
    ref.current.focus();
  } catch (e) {
    console.error(e);
  }
}
