import React, { type VFC } from 'react';
import styled from 'styled-components';
import { NameEditor } from './NameEditor';
import { ScoreEditor } from './ScoreEditor';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const App: VFC = () => (
  <AppWrapper>
    <NameEditor />
    <ScoreEditor />
  </AppWrapper>
);
