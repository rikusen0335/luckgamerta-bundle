import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { ChakraProvider } from "@chakra-ui/react"

import { extendTheme } from "@chakra-ui/react"

import "@fontsource/noto-sans-jp/400.css"
import "@fontsource/noto-sans-jp/700.css"


const theme = extendTheme({
  colors: {
    primary: "#5D5F5B",
  },
  fonts: {
    heading: '"Hiragino Kaku Gothic ProN", sans-serif',
    body: '"Hiragino Kaku Gothic ProN", sans-serif',
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('app')
);
