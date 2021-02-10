import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../../common';
import { OverflowMenuAlignment } from '../../constants';

interface IMenuWrapperProps {
  width: string | number;
  marginTop: string | number;
  align: OverflowMenuAlignment;
}

export const MenuWrapper = styled.div<IMenuWrapperProps>`
  position: absolute;
  top: 100%;
  box-sizing: border-box;
  z-index: 5;
  ${({ width, marginTop, align, theme }) => css`
    width: ${typeof width === 'number' ? `${width}px` : width};
    margin-top: ${typeof marginTop === 'number' ? `${marginTop}px` : marginTop};
    ${align}: 0;
    border-radius: ${theme.borderRadius};
    background-color: ${theme.color.neutral.white};
    box-shadow: ${theme.boxShadow[12]};
  `}
`;

MenuWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};
