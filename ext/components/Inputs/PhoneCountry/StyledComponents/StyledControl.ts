import styled from 'styled-components';

export interface IControlProps {
  disabled?: boolean;
  focused?: boolean;
  menuIsOpen?: boolean;
  error?: boolean;
}

export const StyledControl = styled.div<IControlProps>`
  display: flex;
  position: relative;
  background: transparent;
  border-color: transparent;
`;
