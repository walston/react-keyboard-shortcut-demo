import React, { useRef } from "react";
import useKeybinding from "./useKeybindingToFocus";

/** @param {{keybinding: string, [prop: string]: any }} props */
export default function KeyboardList({ keybinding, ...props }) {
  const ref = useRef(null);
  useKeybinding(keybinding, ref);
  return <ul ref={ref} tabIndex={0} {...props} />;
}
