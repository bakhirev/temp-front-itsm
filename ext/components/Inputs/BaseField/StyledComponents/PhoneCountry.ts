import styled from 'styled-components';

import type { Size } from '../../common/types';
import {
  CONTAINER_HEIGHT,
  CONTAINER_WIDTH,
  SELECT_CONTAINER_PADDING_LEFT,
} from '../../PhoneCountry/StyledComponents/constants';

export const CountryPhoneInputBox = styled.div`
  display: flex;
  align-items: center;
`;

export interface ICountrySelectWrapperProps {
  size: Size;
}

export const CountrySelectWrapper = styled.div<ICountrySelectWrapperProps>`
  ${({ size }) => `
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    height: ${CONTAINER_HEIGHT[size]}px;
    width: ${SELECT_CONTAINER_PADDING_LEFT[size] + CONTAINER_WIDTH[size]}px;
    display: flex;
    align-items: center;
    cursor: pointer;
  `}
`;
