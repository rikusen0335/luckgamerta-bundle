import React, { type VFC } from 'react';
import styled, { keyframes } from 'styled-components';
import { usePrevious } from '../../hooks';

const PointContainer = styled.div`
  position: relative;
  width: 50%;
  height: 240px;
`;

const Point = styled.p`
  position: absolute;
  width: 100%;
  height: 240px;
  font-size: 240px;
  color: white;
  text-align: center;
  animation-duration: 0.5s;
`;

const flipOut = keyframes`
  0% {
    transform: rotateX(0deg);
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    transform: rotateX(-180deg);
    opacity: 0;
  }
`;

const PreviousPoint = styled(Point)`
  animation-name: ${flipOut};
  transform: rotateX(-180deg);
  opacity: 0;
`;

const flipIn = keyframes`
  0% {
    transform: rotateX(180deg);
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    transform: rotateX(0deg);
    opacity: 1;
  }
`;

const CurrentPoint = styled(Point)`
  animation-name: ${flipIn};
`;

export const AnimatedPoint: VFC<{ children: string }> = React.memo(
  function AnimatedPoint({ children }) {
    const previous = usePrevious(children) ?? '';
    return (
      <PointContainer>
        <PreviousPoint key={previous}>{previous}</PreviousPoint>
        <CurrentPoint key={children}>{children}</CurrentPoint>
      </PointContainer>
    );
  }
);
