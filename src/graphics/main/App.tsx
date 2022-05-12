import { TwitchEmbed } from '@/components';
import { useReplicant } from '@/hooks';
import { Box, Container, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import React, { useEffect, useState, type VFC } from 'react';
import useGoogleSheets from 'use-google-sheets';
import dayjs from "dayjs"

export const App: VFC = () => {
  const [names] = useReplicant('names');
  const [scores] = useReplicant('scores');

  const { data, loading, error } = useGoogleSheets({
    apiKey: process.env.SPREADSHEET_API_KEY || "",
    sheetId: process.env.SPREADSHEET_ID || "",
    sheetsNames: ["走者基本情報"]
  });

  const [name, setName] = useState("unrealengine")

  useEffect(() => {
    setTimeout(() => {
      setName("mio343")
    }, 4000)
  }, [])

  const ID = "ID"
  const RUNNER = "走者名"
  const START_TIME = "開始時間"
  const END_TIME = "終了時間"
  const GAME_NAME = "ゲーム名"
  const CATEGORY_NAME = "カテゴリ名"
  const TWITCH_CHANNEL = "Twitch"

  const CopyTwitchEmbed = ({ channelName }: { channelName: string }) => {
    return (
      <TwitchEmbed width="100%" height="100%" channelName={channelName} parent="localhost" />
    )
  }

  type StreamInformationProps = {
    gameName: string;
    categoryName: string;
    twitchName: string;
  }
  const StreamInformation : VFC<StreamInformationProps> = ({ gameName, categoryName, twitchName }) => {
    return (
      <Grid
        templateRows='repeat(9, 1fr)'
      >
        <GridItem rowSpan={8}>
          <TwitchEmbed width="100%" height="100%" channelName={twitchName} parent="localhost" />
        </GridItem>
        <GridItem rowSpan={1}>
          <Text>{gameName}</Text>
          <Text>{categoryName}</Text>
        </GridItem>
      </Grid>
    )
  }

  type RunnerInformationProps = {
    runnerName: string;
    twitchName: string;
    timePeriod: string;
    commentatorName: string;
  }
  const RunnerInformation: VFC<RunnerInformationProps> = ({ runnerName, twitchName, timePeriod, commentatorName }) => {
    return (
      <GridItem rowSpan={5} border={2} borderColor="primary" borderStyle="solid">
        <Flex flexDir="column" p={2}>
          <Text>{runnerName}</Text>
          <Text>{twitchName}</Text>
          <Text>{timePeriod}</Text>
          <Text>{commentatorName}</Text>
        </Flex>
      </GridItem>
    )
  }

  if (typeof names === 'undefined' || typeof scores === 'undefined')
    return null;

  return (
    <Grid
      h="100vh"
      p="16px"
      templateRows='repeat(2, 1fr)'
      templateColumns='repeat(7, 1fr)'
      gap={8}
    >
      <GridItem colSpan={1} rowSpan={2} >
        <Grid
          h="100%"
          gap={3}
          templateRows='repeat(21, 1fr)'
        >
          <GridItem colSpan={1}>
            <Heading as="h1" size="md" color="primary" fontWeight="normal" mb={2}>Luck Game RTA</Heading>
          </GridItem>
          <RunnerInformation runnerName="test" twitchName="_twitch_" timePeriod="2:00:00" commentatorName="hage" />
          <RunnerInformation runnerName="test" twitchName="_twitch_" timePeriod="2:00:00" commentatorName="hage" />
          <RunnerInformation runnerName="test" twitchName="_twitch_" timePeriod="2:00:00" commentatorName="hage" />
          <RunnerInformation runnerName="test" twitchName="_twitch_" timePeriod="2:00:00" commentatorName="hage" />
        </Grid>
      </GridItem>
      <GridItem colSpan={3} rowSpan={1}>
        <StreamInformation gameName="game_name" categoryName="Any %" twitchName={name}  />
      </GridItem>
      <GridItem colSpan={3} rowSpan={1}>
        <StreamInformation gameName="game_name" categoryName="Any %" twitchName="hoge_ch"  />
      </GridItem>
      <GridItem colSpan={3} rowSpan={1}>
        <StreamInformation gameName="game_name" categoryName="Any %" twitchName="hoge_ch"  />
      </GridItem>
      <GridItem colSpan={3} rowSpan={1}>
        <StreamInformation gameName="game_name" categoryName="Any %" twitchName="hoge_ch"  />
      </GridItem>
    </Grid>
  );
};
