import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../../common';
import type { Size } from '../../common/types';

import { FLAG_ITEM_PADDING_LEFT, OPTION_HEIGHT } from './constants';

export interface IStyledOption {
  size: Size;
  disabled?: boolean;
}
export const StyledOption = styled.div<IStyledOption>`
  ${({ size, disabled, theme }) => `
  padding-left: ${FLAG_ITEM_PADDING_LEFT[size]}px;
  display: flex;
  align-items: center;
  height: ${OPTION_HEIGHT[size]}px;
  width: 100%;
  cursor: ${disabled ? 'default' : 'pointer'};  
  background-color: ${theme.color.neutral.white};
  color: ${theme.color.neutral[90]};
  &:hover {
    color: ${theme.color.primary[60]};
    background-color: ${theme.color.neutral[5]};
  }
  `}
`;

StyledOption.defaultProps = {
  theme: DEFAULT_THEME,
};

export interface IStyledCountryName {
  size: Size;
}

export const StyledCountryName = styled.span<IStyledCountryName>`
  ${({ size }) => css`
    margin-left: ${size === 'micro' ? 6 : 10}px;
  `}
`;

export const StyledCountryPhoneCode = styled.span`
  margin-left: 5px;
  color: ${({ theme }) => theme.color.neutral[50]};
`;

StyledCountryPhoneCode.defaultProps = {
  theme: DEFAULT_THEME,
};
