import { FC } from 'react';
import styled, { css } from 'styled-components';
import { components } from 'react-select';

import { DEFAULT_THEME } from '../../../common';
import { MENU_MAX_HEIGHT, MENU_VERTICAL_PADDING, Size } from '../../constants';

interface IMenuListProps {
  size: Size;
}

export const MenuWrapper = styled.div`
  position: absolute;
  box-sizing: border-box;
  z-index: 5;
  width: 100%;
  top: 100%;
  ${({ theme }) => css`
    border-radius: 0 0 ${theme.borderRadius} ${theme.borderRadius};
    background-color: ${theme.color.neutral.white};
    box-shadow: ${theme.boxShadow[12]};
  `}
`;

MenuWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};

export const MenuListWrapper: FC<IMenuListProps> = styled(components.MenuList)<IMenuListProps>`
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  position: relative;
  max-height: ${({ size }) => `${MENU_MAX_HEIGHT[size]} !important`};
  padding: ${MENU_VERTICAL_PADDING} 0 !important;
  overflow: hidden;
`;
