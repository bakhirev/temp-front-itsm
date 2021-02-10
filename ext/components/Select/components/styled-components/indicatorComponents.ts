import styled, { css } from 'styled-components';

import { CLOSE_ICON_MARGIN_RIGHT } from '../../constants';
import { DEFAULT_THEME } from '../../../common';
import type { ITheme } from '../../../themes';

interface IIconWrapperProps {
  $menuIsOpen?: boolean;
  $focused?: boolean;
  disabled?: boolean;
}

export const IndicatorsContainerWrapper = styled.div`
  align-self: stretch;
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  align-items: baseline;
`;

const commonIconStyles = (
  theme: ITheme,
  disabled?: boolean,
  $focused?: boolean,
  $menuIsOpen?: boolean
) => css`
  cursor: pointer;
  fill: ${() => {
    if (disabled) return theme.color.neutral[30];
    if ($menuIsOpen || $focused) return theme.color.primary[60];
    return theme.color.neutral[50];
  }};
  &:hover {
    fill: ${!disabled && theme.color.primary[60]};
  }
`;

export const ArrowIconWrapper = styled.div<IIconWrapperProps>`
  display: flex;
  align-items: center;
  & svg {
    ${({ theme, disabled, $focused, $menuIsOpen }) =>
      commonIconStyles(theme, disabled, $focused, $menuIsOpen)}
    ${({ $menuIsOpen }) =>
      $menuIsOpen &&
      css`
        transform: rotate(180deg);
      `}
  }
`;

ArrowIconWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};

export const CloseIconWrapper = styled.div<IIconWrapperProps>`
  margin-right: ${CLOSE_ICON_MARGIN_RIGHT};
  display: flex;
  align-items: center;
  & svg {
    ${({ theme, disabled, $focused, $menuIsOpen }) =>
      commonIconStyles(theme, disabled, $focused, $menuIsOpen)}
  }
`;

CloseIconWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};
