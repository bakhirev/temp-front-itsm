import styled from 'styled-components';
import { components } from 'react-select';
import { FC } from 'react';

const { MenuList } = components;

export const MenuListWrapper: FC = styled(MenuList)`
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  position: relative;
  padding: 8px 0 !important;
  overflow: visible !important;
  overflow-y: auto !important;
`;
