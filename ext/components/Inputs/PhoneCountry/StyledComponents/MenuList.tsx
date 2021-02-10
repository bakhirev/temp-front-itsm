import { css } from 'styled-components';
import { components, MenuListComponentProps } from 'react-select';
import React from 'react';

const MenuList = components.MenuList;

const menuListCSS = css`
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  position: relative;
  padding-top: 8px !important;
  padding-bottom: 8px !important;
  overflow: visible !important;
  overflow-y: auto !important;
`;

export const StyledMenuList: React.FC<MenuListComponentProps<any, false>> = ({
  className,
  ...props
}) => <MenuList {...props} className={`${className} ${menuListCSS}`} />;
