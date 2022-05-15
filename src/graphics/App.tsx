import { TwitchEmbed } from '@/components';
import { useReplicant } from '@/hooks';
import { Box, Button, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import React, { ReactNode, useEffect, useState, type VFC } from 'react';
import dayjs from "dayjs"
import { IoLogoGameControllerB } from "react-icons/io"
import { BsTwitch, BsFillClockFill, BsGlobe } from "react-icons/bs"
import { FaMicrophone, FaHeadphonesAlt } from "react-icons/fa"
import { CgScreen } from "react-icons/cg"
import { convertSecondsToHMS } from '@/utils/convertSecondsToHMS';

import backgroundImage from "../assets/images/background.png"

export const App: VFC = () => {
  const [streams] = useReplicant('currentStreams');
  const [generalCommentatorName] = useReplicant('generalCommentatorName');

  const ICON_SIZE = "30px"
  const ICON_COLOR = "#5D5F5B"
  const ICON_MARGIN = 8

  const InfoText = ({ children }: { children: ReactNode }) => {
    return (
      <Text color="primary" fontSize="xl" fontWeight="bold">{children}</Text>
    )
  }

  type StreamInformationProps = {
    boxNumber: string;
    gameName: string;
    categoryName: string;
  }
  const StreamInformation: VFC<StreamInformationProps> = ({ boxNumber, gameName, categoryName }) => {
    return (
      <Grid
        h="100%"
        templateRows='repeat(11, 1fr)'
        gap={3}
      >
        <GridItem rowSpan={9} borderColor="primary" borderStyle="solid">
          {/* <TwitchEmbed width="100%" height="100%" channelName={twitchName} parent="localhost" /> */}
          <Box w={670} h={360} border={2} borderColor="gray.200" borderStyle="solid" bgColor="gray.100" m="auto" />
        </GridItem>
        <GridItem rowSpan={2}>
          <Flex gap={2} flexDir="column" position="relative" mx={10}>
            <Flex
              position="absolute"
              inset={0}
              justifyContent="flex-end"
              alignItems="center"
              mr={3}
            >
              <Text
                color="primary"
                fontSize="3xl"
                fontWeight="bold"
              >{boxNumber}</Text>
            </Flex>

            <Flex alignItems="center">
              <CgScreen color={ICON_COLOR} size={ICON_SIZE} style={{ marginRight: ICON_MARGIN }} />
              <InfoText>{gameName}</InfoText>
            </Flex>
            <Flex alignItems="center">
              <BsGlobe color={ICON_COLOR} size={ICON_SIZE} style={{ marginRight: ICON_MARGIN }} />
              <InfoText>{categoryName}</InfoText>
            </Flex>
          </Flex>
        </GridItem>
      </Grid>
    )
  }

  type RunnerInformationProps = {
    boxNumber: string; // Not runner id
    runnerName: string;
    twitchName: string;
    timePeriod: string;
    commentatorName: string;
  }
  const RunnerInformation: VFC<RunnerInformationProps> = ({ boxNumber, runnerName, twitchName, timePeriod, commentatorName }) => {
    return (
      <GridItem rowSpan={5} border={2} borderColor="primary" borderStyle="solid">
        <Flex flexDir="column" p={3} justifyContent="space-between" h="100%" position="relative">
          <Text
            position="absolute"
            right={0}
            top={0}
            padding="8px"
            color="primary"
            fontSize="3xl"
            fontWeight="bold"
            lineHeight="1.25rem"
          >{boxNumber}</Text>
          <Flex alignItems="center">
            <IoLogoGameControllerB color={ICON_COLOR} size={ICON_SIZE} style={{ marginRight: ICON_MARGIN }} />
            <InfoText>{runnerName}</InfoText>
          </Flex>
          <Flex alignItems="center">
            <BsTwitch color={ICON_COLOR} size={ICON_SIZE} style={{ marginRight: ICON_MARGIN }} />
            <InfoText>{twitchName}</InfoText>
          </Flex>
          <Flex alignItems="center">
            <BsFillClockFill color={ICON_COLOR} size={ICON_SIZE} style={{ marginRight: ICON_MARGIN }} />
            <InfoText>{timePeriod}</InfoText>
          </Flex>
          <Flex alignItems="center">
            <FaMicrophone color={ICON_COLOR} size={ICON_SIZE} style={{ marginRight: ICON_MARGIN }} />
            <InfoText>{commentatorName}</InfoText>
          </Flex>
        </Flex>
      </GridItem>
    )
  }

  console.log("CurrentStream 0:", streams?.[0])
  console.log("CurrentStream 1:", streams?.[1])
  console.log("CurrentStream 2:", streams?.[2])
  console.log("CurrentStream 3:", streams?.[3])

  return (
    <Grid
      backgroundImage={backgroundImage}
      h="100vh"
      maxH="100vh"
      p="16px"
      templateRows='repeat(2, 1fr)'
      templateColumns='repeat(5, 1fr)'
      gap={3}
    >
      <GridItem colSpan={1} rowSpan={2} >
        <Grid
          h="100%"
          gap={5}
          templateRows='repeat(22, 1fr)'
        >
          <GridItem colSpan={1}>
            <Heading as="h1" size="md" color="primary" fontWeight="normal" mb={2} textAlign="center">
              Luck Game RTA
            </Heading>
          </GridItem>
          {streams?.map((s, idx) =>
            <RunnerInformation
              boxNumber={(idx + 1).toString()}
              runnerName={s?.runnerName}
              twitchName={s?.twitchName}
              timePeriod={s?.remainingSeconds ? convertSecondsToHMS(s?.remainingSeconds) : ""}
              commentatorName={s?.commentatorName}
            />
          )}
          <GridItem rowSpan={1}>
            <Flex p={3} border={2} borderColor="primary" borderStyle="solid" alignItems="center">
              <FaHeadphonesAlt color={ICON_COLOR} size={ICON_SIZE} style={{ marginRight: ICON_MARGIN }} />
              <InfoText>{generalCommentatorName}</InfoText>
            </Flex>
          </GridItem>
        </Grid>
      </GridItem>
      {streams?.map((s, idx) =>
        <GridItem colSpan={2} rowSpan={1}>
          <StreamInformation boxNumber={(idx + 1).toString()} gameName={s?.gameName} categoryName={s?.categoryName} twitchName={s?.twitchName} />
        </GridItem>
      )}
    </Grid>
  );
};
