import React from 'react';
import { components } from 'react-select';

import { StyledValueContainer } from '../StyledComponents/ValueContainer';
import { StyledIndicatorsContainer } from '../StyledComponents/IndicatorsContainer';
import { StyledControl } from '../StyledComponents/StyledControl';
import { StyledSelectContainer } from '../StyledComponents/SelectContainer';
import { StyledMenuList } from '../StyledComponents/MenuList';
import { StyledMenu } from '../StyledComponents/Menu';

export const IndicatorsContainer = (props: any) => (
  <StyledIndicatorsContainer>
    <components.IndicatorsContainer {...props} />
  </StyledIndicatorsContainer>
);

export const ValueContainer = ({ children }: any) => (
  <StyledValueContainer>{children}</StyledValueContainer>
);

export const Control = ({ children }: any) => <StyledControl> {children}</StyledControl>;

export const SelectContainer = ({ selectProps: { size }, children }: any) => (
  <StyledSelectContainer size={size}> {children} </StyledSelectContainer>
);

export const Menu = ({
  children,
  innerRef,
  innerProps,
  selectProps: { menuAlignment, menuMarginTop, menuWidth, size },
}: any) => (
  <StyledMenu
    size={size}
    ref={innerRef}
    align={menuAlignment}
    width={menuWidth}
    marginTop={menuMarginTop}
    {...innerProps}
  >
    {children}
  </StyledMenu>
);

export const MenuList = (props: any) => (
  <StyledMenuList {...props}>{props.children}</StyledMenuList>
);
