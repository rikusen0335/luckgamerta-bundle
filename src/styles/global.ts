import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0;
    appearance: none;
    color: inherit;
    font-size: inherit;
    text-transform: inherit;

    &:focus-visible {
      outline: revert;
    }
  }

  input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid gray;
    border-radius: 4px;
    color: unset;
    background: unset;
    appearance: none;
    outline: none;

    &:focus {
      border-color: royalblue;
    }
  }
`;

export const GraphicsGlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow: hidden;
  }

  @import url('https://fonts.googleapis.com/css2?family=Montserrat&family=Noto+Sans+JP&display=swap');
`;
