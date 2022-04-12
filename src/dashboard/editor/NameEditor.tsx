import React, { useCallback, useRef, type VFC } from 'react';
import styled from 'styled-components';
import { useReplicant } from '../../hooks';
import { Button } from '../ui';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Input = styled.input`
  flex: 1;
`;

const ApplyButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
`;

export const NameEditor: VFC = () => {
  const [names, setNames] = useReplicant('names');
  const name0ref = useRef<HTMLInputElement>(null);
  const name1ref = useRef<HTMLInputElement>(null);

  const onApply = useCallback(() => {
    setNames([name0ref.current?.value ?? '', name1ref.current?.value ?? '']);
  }, [setNames]);

  if (typeof names === 'undefined') return null;

  return (
    <Wrapper>
      <InputContainer>
        <Input ref={name0ref} defaultValue={names[0]} size={1} />
        <Input ref={name1ref} defaultValue={names[1]} size={1} />
      </InputContainer>
      <ApplyButton color="danger" onClick={onApply}>
        名前を変更
      </ApplyButton>
    </Wrapper>
  );
};
