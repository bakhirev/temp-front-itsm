import React, { FC } from 'react';
import { MenuListComponentProps } from 'react-select';

import { ISelectComponentItem } from '../index';

import { MenuWrapper, MenuListWrapper } from './styled-components/menuComponents';

export const Menu: FC<any> = ({ innerRef, innerProps, children }) => (
  <MenuWrapper ref={innerRef} {...innerProps}>
    {children}
  </MenuWrapper>
);

export const MenuList: FC<MenuListComponentProps<ISelectComponentItem, false>> = (props) => {
  const {
    children,
    selectProps: { size },
  } = props;

  return (
    <MenuListWrapper {...props} size={size}>
      {children}
    </MenuListWrapper>
  );
};
