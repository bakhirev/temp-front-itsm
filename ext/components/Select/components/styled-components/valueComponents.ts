import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../../common';
import { VALUE_CONTAINER_MARGIN_RIGHT } from '../../constants';

interface IValueProps {
  disabled?: boolean;
}

export const SingleValueWrapper = styled.div<IValueProps>`
  display: block;
  align-items: center;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: ${({ disabled, theme }) => (disabled ? theme.color.neutral[30] : theme.color.neutral[90])};
  ${({ disabled, theme }) =>
    disabled &&
    css`
      & svg {
        fill: ${theme.color.neutral[30]};
      }
    `}
`;

SingleValueWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};

export const ValueContainerWrapper = styled.div`
  -webkit-overflow-scrolling: touch;
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-wrap: nowrap;
  overflow: hidden;
  position: relative;
  margin-right: ${VALUE_CONTAINER_MARGIN_RIGHT};
`;
