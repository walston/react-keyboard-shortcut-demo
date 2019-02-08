import React, {useState} from "react";
import KeyboundInput from "../components/KeyboundInput";
import KeyboundSelect from "../components/KeyboundSelect";
import '../App.css'
import { reduce } from "bluebird";
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body > * {
    font-family: ${props => (props.funTime ? `"Comic Sans MS", cursive, sans-serif` : `inherit`)};
  }
`;

export default function(props) {
  const [optionItem, optionChange] = useState('👎');

  return (
    <>
      <GlobalStyle funTime={optionItem === "👍"}/>
      <h1>Page C</h1>
      <p>
        <KeyboundInput keybinding="⌘⇧G" />
      </p>

      <p>
        <label htmlFor="select">Use Comic Sans? <small>⌘⇧L</small></label>
        <br/>
        <KeyboundSelect
          id="select"
          size={2} 
          keybinding="⌘⇧L"
          onChange={(e) => optionChange(e.target.value)}>
            <option value="👍">👍</option>
            <option value="👎">👎</option>
        </KeyboundSelect>
      </p>
    </>
  );
}
