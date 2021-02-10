import styled, { css } from 'styled-components';

import type { Size } from '../../common/types';

import { FLAG_WIDTH_SCALE_DEFAULT, FLAG_WIDTH_SCALE_MICRO } from './constants';

export const StyledSingleValue = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export interface IIconWrapper {
  size: Size;
}

export const IconWrapper = styled.div<IIconWrapper>`
  ${({ size }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scale(
      ${size === 'micro' ? FLAG_WIDTH_SCALE_MICRO : FLAG_WIDTH_SCALE_DEFAULT},
      ${size === 'micro' ? FLAG_WIDTH_SCALE_MICRO : FLAG_WIDTH_SCALE_DEFAULT}
    );
  `};
`;
