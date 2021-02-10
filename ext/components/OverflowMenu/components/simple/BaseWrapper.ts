import styled from 'styled-components';

export interface IBaseWrapperProps {
  size: number;
}

export const BaseWrapper = styled.div<IBaseWrapperProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;
