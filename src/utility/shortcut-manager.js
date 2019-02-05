// change to { [key: `⇧ ⌘ ⌃ ⎇ X`]: () => void }
const bindings = {};

/** @param {KeyboardEvent} event */
export function globalListener(event) {
  let binding = "";
  if (event.metaKey) binding += "⌘";
  if (event.ctrlKey) binding += "⌃";
  if (event.altKey) binding += "⎇";
  if (event.shiftKey) binding += "⇧";
  binding += event.key.toUpperCase();

  for (const name in bindings) {
    if (name === binding) {
      const func = bindings[name];
      if (typeof func === "function") {
        event.preventDefault();
        func(event);
      }
    }
  }
  console.groupEnd();
}

/**
 * @param {string} binding "Key" & any modifier keys
 * @param {Function} func
 */
export function add(binding, func) {
  if (typeof func === "function") bindings[binding] = func;
}

/** @param {string} binding "Key" & any modifier keys */
export function remove(binding) {
  if (bindings[binding]) delete bindings[binding];
}
