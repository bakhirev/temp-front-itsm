import styled from 'styled-components';

import { DEFAULT_THEME } from '../../../common';
import type { Size } from '../../common/types';

import { DROPDOWN_OFFSET, SELECT_CONTAINER_PADDING_LEFT } from './constants';

export interface IStyledMenu {
  size: Size;
  width: number;
}

export const StyledMenu = styled.div<IStyledMenu>`
  ${({ theme, width, size }) => `
  position: absolute;
  box-sizing: border-box;
  top: ${DROPDOWN_OFFSET[size]}px;
  left: -${SELECT_CONTAINER_PADDING_LEFT[size]}px;
  width: ${width}px;
  border-radius: 0 0 ${theme.borderRadius} ${theme.borderRadius};
  background-color: ${theme.color.neutral.white};
  box-shadow: ${theme.boxShadow[12]};
  `}
`;

StyledMenu.defaultProps = {
  theme: DEFAULT_THEME,
};
