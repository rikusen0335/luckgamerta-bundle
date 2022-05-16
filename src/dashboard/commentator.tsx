import React, { useState, type VFC } from 'react';
import ReactDOM from 'react-dom';
import { Button, ChakraProvider, Flex, Input, Text, useToast } from "@chakra-ui/react"

import { extendTheme } from "@chakra-ui/react"

import "@fontsource/noto-sans-jp/400.css"
import "@fontsource/noto-sans-jp/700.css"
import { useReplicant } from '@/hooks';


const theme = extendTheme({
  colors: {
    primary: "#5D5F5B",
  },
  fonts: {
    heading: '"Noto Sans JP", sans-serif',
    body: '"Noto Sans JP", sans-serif',
  },
  config: {
    initialColorMode: "dark",
  }
})

const App: VFC = () => {
  const [commentatorName, updateName] = useReplicant("generalCommentatorName")
  const [newName, setNewName] = useState(commentatorName)

  const toast = useToast()

  return (
    <Flex p={3} gap={2} flexDir="column">
      <Text>{`現在の総合司会者: ${commentatorName}`}</Text>
      <Input value={newName} placeholder="総合司会者名を入力してください" onChange={(e) => setNewName(e.target.value)} />
      <Flex justifyContent="flex-end">
        <Button onClick={() => {
          updateName(newName ?? "")
          toast({ isClosable: true, title: "総合司会者名を更新しました", duration: 2500 })
        }}>更新する</Button>
      </Flex>
    </Flex>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('app')
);
