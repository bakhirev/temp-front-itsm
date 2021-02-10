import styled from 'styled-components';

import type { Size } from '../../common/types';

import { CONTAINER_WIDTH, SELECT_CONTAINER_PADDING_LEFT } from './constants';

export interface IStyledSelectContainer {
  size: Size;
}

export const StyledSelectContainer = styled.div<IStyledSelectContainer>`
  ${({ size }) => `
    position: absolute;
    display: flex;
    align-items: center;
    left: ${SELECT_CONTAINER_PADDING_LEFT[size]}px;
    width: ${CONTAINER_WIDTH[size]}px;
  `}
`;
