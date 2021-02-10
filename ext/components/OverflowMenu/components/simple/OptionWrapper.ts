import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../../common';

interface IOptionWrapperProps {
  disabled?: boolean;
  focused?: boolean;
  selected?: boolean;
}

export const OptionWrapper = styled.div<IOptionWrapperProps>`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0px 16px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

  ${({ theme }) => css`
    background-color: ${theme.color.neutral.white};
    color: ${theme.color.neutral[90]};
  `}

  ${({ selected, disabled, theme }) =>
    (selected || disabled) &&
    css`
      background-color: ${theme.color.neutral.white};
      color: ${theme.color.neutral[30]};
    `}

  ${({ focused, theme }) =>
    focused &&
    css`
      color: ${theme.color.primary[60]};
      background-color: ${theme.color.neutral[5]};
    `}

  ${({ theme, disabled }) =>
    !disabled &&
    css`
      &:hover {
        color: ${theme.color.primary[60]};
        background-color: ${theme.color.neutral[5]};
      }
    `}

  /* width of option content */
  & > div {
    width: 100%;
  }
`;

OptionWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};
