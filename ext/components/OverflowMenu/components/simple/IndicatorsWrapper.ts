import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../../common';

import { IconWrapper } from './IconWrapper';
import { BaseWrapper } from './BaseWrapper';
import type { IBaseWrapperProps } from './BaseWrapper';

interface IIndicatorsWrapperProps extends IBaseWrapperProps {
  menuIsOpen: boolean;
  focused?: boolean;
}

export const IndicatorsWrapper = styled(BaseWrapper)<IIndicatorsWrapperProps>`
  align-self: stretch;
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  &:hover {
    ${IconWrapper}:before {
      background-color: ${({ theme }) => theme.color.opacity.blackHover};
    }
  }
  &:active {
    ${IconWrapper}:before {
      background-color: ${({ theme }) => theme.color.opacity.blackPressed};
    }
  }

  ${({ menuIsOpen, focused, theme }) =>
    (menuIsOpen || focused) &&
    css`
      ${IconWrapper}:before {
        background-color: ${theme.color.opacity.blackFocus};
      }
    `}
`;

IndicatorsWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};
