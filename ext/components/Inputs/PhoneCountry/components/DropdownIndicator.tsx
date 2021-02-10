import React, { FC } from 'react';
import { IndicatorProps } from 'react-select';

import { StyledDropdownIndication } from '../StyledComponents/DropdownIndicator';
import { ReactComponent as ChevronDownOutline } from '../../../Icons/system/ChevronDownOutline.svg';
import { ReactComponent as ChevronUpOutline } from '../../../Icons/system/ChevronUpOutline.svg';
import { ICON_DEFAULT_SIZE, ICON_MICRO_SIZE } from '../../../MultiSelect/constants';

import type { ISelectComponentItem } from './CountryDropdown';

export type IDropdownIndicator = IndicatorProps<ISelectComponentItem, false> & {
  isDisabled?: boolean;
};

export const DropdownIndicator: FC<IDropdownIndicator> = (props) => {
  const {
    innerProps: { ref, ...restInnerProps },
    isFocused,
    selectProps: { menuIsOpen, size, isDisabled },
  } = props;

  const Icon = menuIsOpen ? ChevronUpOutline : ChevronDownOutline;
  const iconSize = size === 'micro' ? ICON_MICRO_SIZE : ICON_DEFAULT_SIZE;
  return (
    <StyledDropdownIndication
      {...restInnerProps}
      ref={ref}
      disabled={isDisabled}
      focused={isFocused}
      menuIsOpen={menuIsOpen}
    >
      <Icon width={iconSize} height={iconSize} />
    </StyledDropdownIndication>
  );
};
