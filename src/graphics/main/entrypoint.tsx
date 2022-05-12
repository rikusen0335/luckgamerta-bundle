import React from 'react';
import ReactDOM from 'react-dom';
import { GraphicsGlobalStyle } from '@/styles/global';
import { App } from './App';
import { ChakraProvider } from "@chakra-ui/react"

import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    primary: "#5D5F5B",
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <GraphicsGlobalStyle />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('app')
);
