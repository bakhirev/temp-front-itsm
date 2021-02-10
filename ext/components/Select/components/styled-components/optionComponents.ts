import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../../common';
import {
  OPTION_HEIGHT,
  OPTION_PADDING,
  PRODUCT_OPTION_ICON,
  PRODUCT_OPTION_ICON_SPACING,
  ICON_MARGIN_RIGHT_MICRO,
  ICON_MARGIN_RIGHT_DEFAULT,
  Size,
  SelectType,
} from '../../constants';

interface IOptionWrapperProps {
  size: Size;
  disabled?: boolean;
  selected?: boolean;
  focused?: boolean;
  $inner?: boolean;
  $type?: SelectType;
}

interface IOptionIconProps {
  size: Size;
}

interface ICardProductComponentProps {
  $type: SelectType;
  $image?: string;
}

export const OptionText = styled.div`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const OptionWrapper = styled.div<IOptionWrapperProps>`
  display: flex;
  align-items: center;
  ${({ theme, size, disabled, $inner = false }) => css`
    ${$inner ? 'width: 100%;' : ''}
    height: ${OPTION_HEIGHT[size]};
    padding: ${$inner ? 0 : OPTION_PADDING[size]};
    cursor: ${disabled || $inner ? 'default' : 'pointer'};
    ${!$inner &&
    `
        background-color: ${theme.color.neutral.white};
        color: ${theme.color.neutral[90]};
        & svg {
          fill: ${theme.color.neutral[50]};
        }
      `};
  `};

  ${({ selected, theme, $inner = false }) =>
    selected &&
    !$inner &&
    css`
      background-color: ${theme.color.neutral.white};
      color: ${theme.color.primary[60]};
      & svg {
        fill: ${theme.color.primary[60]};
      }
    `};

  ${({ disabled, theme, $inner = false }) =>
    disabled &&
    !$inner &&
    css`
      background-color: ${theme.color.neutral.white};
      color: ${theme.color.neutral[30]};
      & svg {
        fill: ${theme.color.neutral[30]};
      }
    `};

  ${({ focused, theme, $inner = false }) =>
    focused &&
    !$inner &&
    css`
      color: ${theme.color.primary[60]};
      background-color: ${theme.color.neutral[5]};
      & svg {
        fill: ${theme.color.primary[60]};
      }
    `};

  ${({ theme, disabled, $inner = false }) =>
    !disabled &&
    !$inner &&
    css`
      &:hover {
        color: ${theme.color.primary[60]};
        background-color: ${theme.color.neutral[5]};
        & svg {
          fill: ${theme.color.primary[60]};
        }
      }
    `};

  /* width of option content */
  & > div {
    width: 100%;
    overflow: hidden;
  }
`;

OptionWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};

export const OptionIcon = styled.div<IOptionIconProps>`
  display: flex;
  flex-shrink: 0;
  width: auto !important;
  align-items: center;
  margin-right: ${({ size }) =>
    size === 'micro' ? ICON_MARGIN_RIGHT_MICRO : ICON_MARGIN_RIGHT_DEFAULT};
`;

export const OptionImageComponent = styled.div<ICardProductComponentProps>`
  ${({ theme, $type, $image }) => css`
    display: inline-block;
    position: relative;
    overflow: visible;
    width: ${PRODUCT_OPTION_ICON[$type].width}px;
    min-width: ${PRODUCT_OPTION_ICON[$type].width}px;
    height: ${PRODUCT_OPTION_ICON[$type].height}px;
    min-height: ${PRODUCT_OPTION_ICON[$type].height}px;
    margin: 2px ${PRODUCT_OPTION_ICON_SPACING}px 2px 0;
    border-radius: ${PRODUCT_OPTION_ICON[$type].radius};
    & > * {
      border-radius: ${PRODUCT_OPTION_ICON[$type].radius};
    }
    background-color: ${theme.color.neutral[20]};
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    ${$image ? `background-image: url(${$image});` : ''}
  `}
  & > * {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }
`;

OptionImageComponent.defaultProps = {
  theme: DEFAULT_THEME,
};

export const OptionDoubleLineLabel = styled.div`
  display: inline-block;
  overflow: hidden;
`;

export const OptionEmbracedLabelLine = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 20px;
  color: inherit;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const OptionAdditionalNoticeLine = styled.div`
  ${({ theme }) => css`
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    line-height: 16px;
    letter-spacing: 0.02em;
    color: ${theme.color.neutral[50]};
    text-overflow: ellipsis;
    overflow: hidden;
  `}
`;

OptionAdditionalNoticeLine.defaultProps = {
  theme: DEFAULT_THEME,
};

export const OptionProductOrCard = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
