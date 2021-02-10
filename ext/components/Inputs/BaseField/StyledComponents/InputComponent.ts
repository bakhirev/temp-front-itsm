import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../../common';
import { TYPOGRAPHY } from '../../../Typography';
import { INPUT_WIDTH } from '../../constants';
import { getInputNumberMargin } from '../../PhoneCountry/StyledComponents/constants';

import type { Size } from './../../common';

export interface IInputComponentProps {
  $size: Size;
  focused: boolean;
  disabled?: boolean;
  withSelectComponent?: boolean;
}

export const InputComponent = styled.input<IInputComponentProps>`
  box-sizing: border-box;
  ${({ theme, disabled, focused, $size, withSelectComponent }) => css`
    width: ${INPUT_WIDTH};
    outline: none;
    height: 100%;
    padding-left: ${theme.input.inputPadding}px;
    ${withSelectComponent ? `margin-left: ${getInputNumberMargin($size)}px;` : ''}
    color: ${disabled ? theme.color.neutral[30] : theme.color.neutral[90]};
    font-family: ${TYPOGRAPHY.fontFamily};
    font-size: ${$size === 'micro' ? TYPOGRAPHY.fontSize[14] : TYPOGRAPHY.fontSize[16]};
    line-height: ${$size === 'micro' ? TYPOGRAPHY.lineHeight[20] : TYPOGRAPHY.lineHeight[24]};
    font-weight: ${TYPOGRAPHY.fontWeight.regular};
    text-overflow: ellipsis;
    border-color: transparent;
    background: transparent;
    ::-ms-clear {
      display: none;
    }
    ::-ms-reveal {
      display: none;
    }
    ::placeholder,
    ::-webkit-input-placeholder {
      color: ${disabled || focused ? theme.color.neutral[30] : theme.color.neutral[50]};
    }

    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }
  `}
`;

InputComponent.defaultProps = {
  theme: DEFAULT_THEME,
};
