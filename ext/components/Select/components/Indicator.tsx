import React, { FC } from 'react';
import { components, IndicatorProps } from 'react-select';

import { ICON_DEFAULT_SIZE, ICON_MICRO_SIZE } from '../constants';
import { ISelectComponentItem } from '../index';
import { ReactComponent as ChevronDownOutline } from '../../Icons/system/ChevronDownOutline.svg';
import { ReactComponent as CloseOutline } from '../../Icons/service/CloseOutline.svg';

import {
  ArrowIconWrapper,
  CloseIconWrapper,
  IndicatorsContainerWrapper,
} from './styled-components/indicatorComponents';

export type IIndicatorProps = IndicatorProps<ISelectComponentItem, false> & {
  isDisabled?: boolean;
};

export const DropdownIndicator: FC<IIndicatorProps> = (props) => {
  const {
    getStyles,
    innerProps: { ref, ...restInnerProps },
    isDisabled,
    isFocused,
    selectProps: { menuIsOpen, size },
  } = props;
  const iconSize = size === 'micro' ? ICON_MICRO_SIZE : ICON_DEFAULT_SIZE;

  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={{
        ...getStyles('clearIndicator', props),
        padding: 0,
      }}
    >
      <ArrowIconWrapper $menuIsOpen={menuIsOpen} disabled={isDisabled} $focused={isFocused}>
        <ChevronDownOutline width={iconSize} height={iconSize} />
      </ArrowIconWrapper>
    </div>
  );
};

export const IndicatorsContainer: FC<any> = (props) => (
  <IndicatorsContainerWrapper>
    <components.IndicatorsContainer {...props} />
  </IndicatorsContainerWrapper>
);

export const ClearIndicator: FC<IIndicatorProps> = (props) => {
  const {
    getStyles,
    innerProps: { ref, ...restInnerProps },
    isDisabled,
    isFocused,
    selectProps: { menuIsOpen, size },
  } = props;
  const iconSize = size === 'micro' ? ICON_MICRO_SIZE : ICON_DEFAULT_SIZE;

  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={{
        ...getStyles('clearIndicator', props),
        padding: 0,
      }}
    >
      <CloseIconWrapper $menuIsOpen={menuIsOpen} disabled={isDisabled} $focused={isFocused}>
        <CloseOutline width={iconSize} height={iconSize} />
      </CloseIconWrapper>
    </div>
  );
};
