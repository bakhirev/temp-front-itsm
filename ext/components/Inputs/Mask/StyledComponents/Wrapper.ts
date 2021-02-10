import styled, { css } from 'styled-components';

import { getTextColor } from '../../BaseField/utils-style';
import { DEFAULT_THEME } from '../../../common';

export interface IWrapperProps {
  width: string | number;
  focused: boolean;
  disabled?: boolean;
}

export const Wrapper = styled.div<IWrapperProps>`
  ${({ theme, width, focused, disabled }) => css`
    color: ${getTextColor(focused, disabled, theme)};
    width: ${typeof width === 'number' ? `${width}px` : width};
  `}
`;

Wrapper.defaultProps = {
  theme: DEFAULT_THEME,
};
