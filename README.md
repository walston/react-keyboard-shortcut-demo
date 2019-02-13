# React Keyboard Shortcut Demo

Simple showcase of how to _hook†_ into keyboard events globally and do local actions.

###### † pun intended

```js
import useKeybinding from 'useKeybindingToFocus';

export default function({ keybinding, ...props }) {
  const ref = useRef(null);
  useKeybinding(keybinding, ref)
  return <input ref={ref} {...props} />
}
```

## How Does This Work?

A global registry is provided for use in `React.useEffect`: a simple `add(binding, callback)` & `remove(binding)` api is exported from `{root}/utility/shortcut-manager`. It can be used as follows.

```js
const ref = useRef(null);
function focus() {
  try {
    ref.current.focus();
  } catch (e) {
    console.error(e);
  }
}

useEffect(() => {
  add(keybinding, focus);
  return () => remove(keybinding);
}, [ref]);
```

thanks to Hooks, this is the version provided in the `useKeybindingToFocus(binding, ref)` api that makes this a dead-simple one-liner to utilize.
