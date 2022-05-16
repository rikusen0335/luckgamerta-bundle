import React, { useState, type VFC } from 'react';
import ReactDOM from 'react-dom';
import { Alert, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertIcon, AlertTitle, Button, ChakraProvider, Flex, Input, Select, Text, useDisclosure, useToast } from "@chakra-ui/react"

import { extendTheme } from "@chakra-ui/react"

import "@fontsource/noto-sans-jp/400.css"
import "@fontsource/noto-sans-jp/700.css"
import { useReplicant } from '@/hooks';
import { dayToString } from '@/utils';


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
  const [currentDaySelected] = useReplicant("currentDay")
  const [newDay, setNewDay] = useState(currentDaySelected ?? "day1")

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  const toast = useToast()

  return (
    <Flex p={3} gap={2} flexDir="column">
      <Text>{`現在選択中の日時: ${dayToString(currentDaySelected ?? "day1")}`}</Text>
      <Select onChange={(e) => setNewDay(e.target.value)}>
        <option value="day1">1日目</option>
        <option value="day2">2日目</option>
      </Select>
      <Alert status='error'>
        <AlertIcon />
        <AlertTitle fontSize="sm">日時を変更すると、現在設定されている配信情報がリセットされます！</AlertTitle>
      </Alert>
      <Flex justifyContent="flex-end">
        <Button onClick={onOpen}>更新する</Button>
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              本当に日時を更新してよろしいですか？
            </AlertDialogHeader>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                キャンセル
              </Button>
              <Button
                colorScheme='red'
                onClick={() => {
                  nodecg.sendMessage("onDayChange", { day: newDay })
                  toast({ isClosable: true, title: "日時を更新しました", duration: 2500 })
                  onClose()
                }}
                ml={3}
              >
                更新する
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
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
