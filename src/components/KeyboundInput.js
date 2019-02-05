import React, { useRef, useEffect } from "react";
import useKeybinding from "./useKeybindingToFocus";

/** @param {{ keybinding: string, [prop: string]: any }} props */
export default function KeyboundInput({ keybinding, ...props }) {
  const ref = useRef(null);
  useKeybinding(keybinding, ref);
  return <input ref={ref} {...props} placeholder={keybinding} />;
}
