import React, { type VFC } from 'react';
import styled from 'styled-components';
import { useReplicant } from '../../hooks';
import { pointToString } from '../../utils';
import { AnimatedPoint } from './Point';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 1920px;
  height: 1080px;
  font-family: Montserrat, 'Noto Sans JP', sans-serif;
`;

const Board = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 1920px;
  height: 400px;
  background: linear-gradient(#00000000, #00000080);
`;

const PointWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  filter: drop-shadow(0 0 8px black);
`;

const NameAndGame = styled.div`
  position: relative;
  width: 1920px;
  height: 100px;
  filter: drop-shadow(0 0 8px black);
`;

const NameWrapper = styled.div`
  position: absolute;
  width: 1920px;
  height: 100px;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
`;

const Name = styled.p`
  font-size: 60px;
  width: 50%;
  color: white;
  text-align: center;
  align-items: center;
`;

const GameWrapper = styled.div`
  position: absolute;
  width: 1920px;
  height: 100px;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
`;

const Game = styled.p`
  width: 80px;
  font-size: 80px;
  color: white;
  text-align: center;
  align-items: center;
`;

export const App: VFC = () => {
  const [names] = useReplicant('names');
  const [scores] = useReplicant('scores');

  if (typeof names === 'undefined' || typeof scores === 'undefined')
    return null;

  return (
    <Wrapper>
      <Board>
        <PointWrapper>
          <AnimatedPoint>{pointToString(scores[0].point)}</AnimatedPoint>
          <AnimatedPoint>{pointToString(scores[1].point)}</AnimatedPoint>
        </PointWrapper>
        <NameAndGame>
          <NameWrapper>
            <Name>{names[0]}</Name>
            <Name>{names[1]}</Name>
          </NameWrapper>
          <GameWrapper>
            <Game>{scores[0].game}</Game>
            <Game>-</Game>
            <Game>{scores[1].game}</Game>
          </GameWrapper>
        </NameAndGame>
      </Board>
    </Wrapper>
  );
};
