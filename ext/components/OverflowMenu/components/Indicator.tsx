import React from 'react';
import { components } from 'react-select';

import { ReactComponent as MoreOutline } from '../../Icons/system/MoreOutline.svg';

import { IconWrapper } from './simple/IconWrapper';
import { IndicatorsWrapper } from './simple/IndicatorsWrapper';

export const DropdownIndicator = (props: any) => {
  const {
    getStyles,
    innerProps: { ref, ...restInnerProps },
    selectProps: { isDisabled, size },
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={{
        ...getStyles('clearIndicator', props),
        padding: 0,
      }}
    >
      <IconWrapper disabled={isDisabled}>
        <MoreOutline width={size} height={size} />
      </IconWrapper>
    </div>
  );
};

export const IndicatorsContainer = (props: any) => {
  const { size, menuIsOpen, isFocused } = props.selectProps;
  return (
    <IndicatorsWrapper size={size} menuIsOpen={menuIsOpen} focused={isFocused}>
      <components.IndicatorsContainer {...props} />
    </IndicatorsWrapper>
  );
};
