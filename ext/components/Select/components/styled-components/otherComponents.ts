import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../../common';
import { Body2Long, Body1Long, Body2Short } from '../../../Typography';
import {
  ADDITIONAL_TEXT_MARGIN_TOP,
  BOTTOM_LINE_HEIGHT_ON_FOCUS,
  CONTROL_HEIGHT,
  CONTROL_PADDING,
  LABEL_MARGIN_BOTTOM,
  SELECT_DEFAULT_WIDTH,
  Size,
  SelectType,
} from '../../constants';

interface ICommonProps {
  focused?: boolean;
  disabled?: boolean;
}

interface IPlaceholderProps extends ICommonProps {
  menuIsOpen?: boolean;
}

interface ILabelProps extends ICommonProps {
  htmlFor?: string;
}

interface IAdditionalTextProps extends ICommonProps {
  error?: boolean;
}

interface IControlProps extends ICommonProps, IAdditionalTextProps, IPlaceholderProps {
  size: Size;
  $type: SelectType;
}

interface ISelectWrapperProps {
  width?: string | number;
}

export const SelectContainer = styled.div`
  position: relative;
`;

export const Label = styled(Body2Short)<ILabelProps>`
  margin-bottom: ${LABEL_MARGIN_BOTTOM};
  color: ${({ theme, focused, disabled }) => {
    if (disabled) {
      return theme.color.neutral[30];
    }
    return focused ? theme.color.neutral[90] : theme.color.neutral[50];
  }};
`;

Label.defaultProps = {
  theme: DEFAULT_THEME,
};

export const AdditionalText = styled(Body2Short)<IAdditionalTextProps>`
  margin-top: ${ADDITIONAL_TEXT_MARGIN_TOP};
  color: ${({ theme, focused, disabled, error }) => {
    if (disabled) {
      return theme.color.neutral[30];
    }
    if (error) {
      return theme.color.error[60];
    }
    return focused ? theme.color.neutral[90] : theme.color.neutral[50];
  }};
`;

AdditionalText.defaultProps = {
  theme: DEFAULT_THEME,
};

const commonWrapperStyles = (width: string | number = SELECT_DEFAULT_WIDTH) => css`
  display: block;
  width: ${typeof width === 'number' ? `${width}px` : width};
`;

const MicroWrapper = styled(Body2Long)<ISelectWrapperProps>`
  ${({ width }) => commonWrapperStyles(width)}
`;

const DefaultWrapper = styled(Body1Long)<ISelectWrapperProps>`
  ${({ width }) => commonWrapperStyles(width)}
`;

export const Wrapper = (size: Size) => (size === 'micro' ? MicroWrapper : DefaultWrapper);

export const SelectControl = styled.div<IControlProps>`
  display: flex;
  position: relative;

  ${({ theme, disabled, focused, menuIsOpen, size, $type }) => css`
    height: ${CONTROL_HEIGHT[size]};
    padding: ${CONTROL_PADDING($type)[size]};
    color: ${disabled ? theme.color.neutral[30] : theme.color.neutral[90]};
    border: 1px solid ${disabled ? theme.color.neutral[10] : theme.color.neutral[20]};
    border-radius: ${theme.borderRadius};
    background: ${disabled ? theme.color.neutral[10] : theme.color.neutral.white};
    ${!focused &&
    !menuIsOpen &&
    `
      &:hover {
        background: ${theme.color.neutral[5]};
      }
    `}
    &:before {
      position: absolute;
      content: '';
      bottom: -1px;
      left: -1px;
      width: calc(100% + 1px + 1px);
      height: ${BOTTOM_LINE_HEIGHT_ON_FOCUS};
      background: transparent;
    }
  `}

  ${({ theme, menuIsOpen, focused, error, disabled }) =>
    (menuIsOpen || focused || error) &&
    !disabled &&
    css`
      border-radius: ${theme.borderRadius} ${theme.borderRadius} 0 0;
      &:before {
        background: ${error ? theme.color.error[60] : theme.color.primary[60]};
      }
    `}
`;

SelectControl.defaultProps = {
  theme: DEFAULT_THEME,
};

export const PlaceholderWrapper = styled.div<IPlaceholderProps>`
  display: inline-flex;
  pointer-events: none;
  align-items: center;
  position: absolute;
  max-width: 100%;
  transform: translateY(-50%);
  overflow: hidden;
  white-space: nowrap;
  top: 50%;
  color: ${({ theme, focused, menuIsOpen, disabled }) =>
    focused || menuIsOpen || disabled ? theme.color.neutral[30] : theme.color.neutral[50]};
  transition: all 0.2s;
  z-index: 4;
`;

PlaceholderWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};

export const TooltipPlaceholder = styled.div``;
