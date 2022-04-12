import React, { useState, type VFC } from 'react';
import styled from 'styled-components';
import { useReplicant } from '../../hooks';
import { replicantDefaultValues, Score } from '@/types/replicant';
import { Button } from '../ui';

const ScorePartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
`;

const Select = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid gray;
  border-radius: 4px;
`;

const ScorePartEditor: VFC<{
  score: Score;
  counterpartPoint: Score['point'];
  onChange: (score: Score) => void;
}> = ({ score, counterpartPoint, onChange }) => (
  <ScorePartWrapper>
    <Input
      type="number"
      value={score.game}
      min={0}
      onChange={e => onChange({ ...score, game: Number(e.target.value) })}
    />
    <Select
      onChange={e =>
        onChange({ ...score, point: Number(e.target.value) as Score['point'] })
      }
    >
      <option value={0} disabled={counterpartPoint === 4}>
        0
      </option>
      <option value={1} disabled={counterpartPoint === 4}>
        15
      </option>
      <option value={2} disabled={counterpartPoint === 4}>
        30
      </option>
      <option value={3}>40</option>
      <option value={4} disabled={counterpartPoint !== 3}>
        Adv.
      </option>
    </Select>
  </ScorePartWrapper>
);
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ApplyButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
`;

export const ScoreEditor: VFC = () => {
  const [editingScores, setEditingScores] = useState(
    replicantDefaultValues.scores
  );
  const [, setScores] = useReplicant('scores');
  return (
    <Wrapper>
      <InputContainer>
        {([0, 1] as const).map(i => (
          <ScorePartEditor
            key={i}
            score={editingScores[i]}
            counterpartPoint={editingScores[1 - i].point}
            onChange={v =>
              setEditingScores(
                e => e.map((s, j) => (i === j ? v : s)) as [Score, Score]
              )
            }
          />
        ))}
      </InputContainer>
      <ApplyButton color="danger" onClick={() => setScores(editingScores)}>
        スコアを変更
      </ApplyButton>
    </Wrapper>
  );
};
