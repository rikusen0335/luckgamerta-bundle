import styled from 'styled-components';

export const Button = styled.button<{ color?: 'primary' | 'danger' }>`
  background: ${({ color = 'primary' }) =>
    color === 'primary' ? 'royalblue' : 'crimson'};
  color: white;
  border-radius: 4px;

  &:active {
    box-shadow: 0 0 0 2px white;
  }
`;
