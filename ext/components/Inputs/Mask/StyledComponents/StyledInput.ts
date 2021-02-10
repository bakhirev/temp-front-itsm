import styled, { css } from 'styled-components';

import { LINE_HEIGHT_INPUT, INPUT_PADDING } from '../constants';
import { DEFAULT_THEME } from '../../../common';
import { TYPOGRAPHY } from '../../../Typography';
import type { Size } from '../../common';
import { getInputMarginTop } from '../utils';

export interface IInputComponentProps {
  $size: Size;
  focused: boolean;
  disabled?: boolean;
}

export const StyledInput = styled.input<IInputComponentProps>`
  ${({ theme, $size, focused, disabled }) => css`
    position: relative;
    outline: none;
    font-feature-settings: 'tnum' on, 'lnum' on, 'cv03' on, 'cv04' on;
    box-sizing: content-box;
    display: block;
    width: 90%;
    padding-top: ${getInputMarginTop($size)}px;
    padding-bottom: ${getInputMarginTop($size)}px;
    font-family: ${TYPOGRAPHY.fontFamily};
    font-size: ${$size === 'micro' ? TYPOGRAPHY.fontSize[14] : TYPOGRAPHY.fontSize[16]};
    line-height: ${$size === 'micro' ? TYPOGRAPHY.lineHeight[20] : `${LINE_HEIGHT_INPUT}px`};
    font-weight: ${TYPOGRAPHY.fontWeight.regular};
    padding-left: ${INPUT_PADDING}px;
    white-space: pre;
    border: transparent;
    font-stretch: normal;
    font-style: normal;
    color: ${disabled ? theme.color.neutral[30] : theme.color.neutral[90]};
    ::placeholder {
      color: #a7afd9;
    }

    background-color: transparent;

    &:focus {
      opacity: unset;
    }

    ::placeholder,
    ::-webkit-input-placeholder {
      color: ${disabled || focused ? theme.color.neutral[30] : theme.color.neutral[50]};
    }
  `}
`;

StyledInput.defaultProps = {
  theme: DEFAULT_THEME,
};
