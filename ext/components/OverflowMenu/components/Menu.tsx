import React from 'react';

import { MenuWrapper } from './simple/MenuWrapper';
import { MenuListWrapper } from './simple/MenuListWrapper';

export const Menu = ({
  children,
  innerRef,
  innerProps,
  selectProps: { menuAlignment, menuMarginTop, menuWidth },
}: any) => (
  <MenuWrapper
    ref={innerRef}
    align={menuAlignment}
    width={menuWidth}
    marginTop={menuMarginTop}
    {...innerProps}
  >
    {children}
  </MenuWrapper>
);

export const MenuList = (props: any) => (
  <MenuListWrapper {...props}>{props.children}</MenuListWrapper>
);
