import React, { useCallback, type VFC } from 'react';
import styled from 'styled-components';
import { Button } from '../ui';
import { useReplicant } from '@/hooks';
import { pointToString } from '@/utils';

const ScoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Text = styled.p<{ textSize?: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ textSize = 1 }) => `${textSize}rem`};
  font-size: ${({ textSize = 1 }) => `${textSize}rem`};
`;

const AddButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  font-size: 4rem;
`;

const Score: VFC<{ i: 0 | 1 }> = ({ i }) => {
  const [names] = useReplicant('names');
  const [scores, setScores] = useReplicant('scores');

  const increment = useCallback(() => {
    if (typeof scores === 'undefined') return;
    const j = 1 - i;
    const newScores = [{ ...scores[0] }, { ...scores[1] }] as typeof scores;

    if (
      scores[i].point === 4 ||
      (scores[i].point === 3 && scores[j].point <= 2)
    ) {
      newScores[i].game += 1;
      newScores[i].point = 0;
      newScores[j].point = 0;
    } else if (scores[i].point === 3 && scores[j].point === 4) {
      newScores[j].point -= 1;
    } else {
      newScores[i].point += 1;
    }

    setScores(newScores);
  }, [i, scores, setScores]);

  if (typeof names === 'undefined' || typeof scores === 'undefined')
    return null;

  return (
    <ScoreWrapper>
      <Text>{names[i]}</Text>
      <Text textSize={2}>{scores[i].game}</Text>
      <Text textSize={3}>{pointToString(scores[i].point)}</Text>
      <AddButton onClick={increment}>+</AddButton>
    </ScoreWrapper>
  );
};

const AppWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`;

export const App: VFC = () => (
  <AppWrapper>
    <Score i={0} />
    <Score i={1} />
  </AppWrapper>
);
