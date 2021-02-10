import styled from 'styled-components';

import { DEFAULT_THEME } from '../../../common';

export interface IStyledDropdownIndication {
  disabled?: boolean;
  focused?: boolean;
  menuIsOpen?: boolean;
}

export const StyledDropdownIndication = styled.div<IStyledDropdownIndication>`
  display: flex;
  align-items: center;
  justify-content: center;
  & svg {
    cursor: pointer;
    fill: ${({ theme, disabled, focused, menuIsOpen }) => {
      if (disabled) return theme.color.neutral[30];
      if ((menuIsOpen || focused) && !disabled) return theme.color.primary[60];
      return theme.color.neutral[50];
    }};
    &:hover {
      fill: ${({ theme, disabled }) => !disabled && theme.color.primary[60]};
    }
  }
`;

StyledDropdownIndication.defaultProps = {
  theme: DEFAULT_THEME,
};
