import styled from 'styled-components';

import { DEFAULT_THEME } from '../../../common';

interface IIconProps {
  disabled?: boolean;
}

export const IconWrapper = styled.div<IIconProps>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  & svg {
    fill: ${({ theme, disabled }) =>
      disabled ? theme.color.neutral[30] : theme.color.neutral[50]};
  }
  &:before {
    content: '';
    position: absolute;
    top: -6px;
    left: -6px;
    right: -6px;
    bottom: -6px;
    border-radius: 50%;
    background-color: transparent;
  }
`;

IconWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};
