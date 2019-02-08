import React, { useRef, useEffect } from "react";
import useKeybinding from "./useKeybindingToFocus";

const style = {
  padding: "8px",
  fontSize: "16px",
}

/** @param {{ keybinding: string, [prop: string]: any }} props */
export default function KeyboundSelect({ children, keybinding, ...props }) {
  const ref = useRef(null);
  useKeybinding(keybinding, ref);
  return <select ref={ref} {...props} style={style} placeholder={keybinding}>{children}</select>;
}
