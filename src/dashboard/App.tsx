import { useReplicant } from '@/hooks';
import { Position } from '@/types';
import { positionToString } from '@/utils';
import { Box, Button, Flex, Grid, GridItem, Heading, Select, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState, type VFC } from 'react';

export const App: VFC = () => {
  const [allStreams] = useReplicant('allStreams')
  const [streams] = useReplicant('currentStreams')

  const toast = useToast()

  type StreamConfigProps = {
    boxName: string
    position: Position
    initialRunnerId: string | null
  }
  const StreamConfigBox: VFC<StreamConfigProps> = ({ boxName, position, initialRunnerId }) => {
    const [runnerId, setRunnerId] = useState<string | null>(initialRunnerId)

    return (
      <GridItem
        colSpan={1}
        rowSpan={1}
        border={2}
        borderStyle="solid"
        borderColor="gray.600"
        p={5}
      >
        <Heading fontSize="xl" mb={4}>{boxName}</Heading>
        <Select placeholder='走者を選択してください' mb={3} onChange={(e) => setRunnerId(e.target.value)}>
          {allStreams?.map((s) =>
            <option value={s.runnerId} selected={s.runnerId === runnerId}>{`${s.runnerId} - ${s.runnerName} | ${s.gameName}`}</option>
          )}
        </Select>
        <Flex justifyContent="flex-end" alignItems="center" gap={2}>
          <Button onClick={
            () => {
              setRunnerId(initialRunnerId)
              toast({ isClosable: true, title: "更新をキャンセルしました", duration: 2500 })
            }
          }>
            更新前に戻す
          </Button>
          <Button onClick={
            () => {
              nodecg.sendMessage("onRunnerInfoChange", { runnerId, position })
              toast({ isClosable: true, title: "更新に成功しました", duration: 2500 })
            }}
          >
            更新する
          </Button>
        </Flex>
      </GridItem>
    )
  }

  return (
    <Grid
      p={3}
      templateRows='repeat(2, 1fr)'
      templateColumns='repeat(2, 1fr)'
      gap={4}
    >
      <StreamConfigBox boxName={`枠１（${positionToString(Position.LEFT_TOP)}）`} position={Position.LEFT_TOP} initialRunnerId={streams?.[0]?.runnerId ?? null} />
      <StreamConfigBox boxName={`枠２（${positionToString(Position.RIGHT_TOP)}）`} position={Position.RIGHT_TOP} initialRunnerId={streams?.[1]?.runnerId ?? null} />
      <StreamConfigBox boxName={`枠３（${positionToString(Position.LEFT_BOTTOM)}）`} position={Position.LEFT_BOTTOM} initialRunnerId={streams?.[2]?.runnerId ?? null} />
      <StreamConfigBox boxName={`枠４（${positionToString(Position.RIGHT_BOTTOM)}）`} position={Position.RIGHT_BOTTOM} initialRunnerId={streams?.[3]?.runnerId ?? null} />
    </Grid>
  );
};
