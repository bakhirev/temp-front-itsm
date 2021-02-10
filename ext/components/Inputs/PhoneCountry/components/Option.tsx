import React, { FC } from 'react';
import { OptionProps } from 'react-select';

import {
  StyledOption,
  StyledCountryName,
  StyledCountryPhoneCode,
} from '../StyledComponents/Option';
import { IconWrapper } from '../StyledComponents/SingleValue';

import { ISelectComponentItem } from './CountryDropdown';

export const Option: FC<OptionProps<ISelectComponentItem, false>> = ({
  label,
  innerProps,
  selectProps: { size },
  data: { icon: Icon, phoneCode },
}) => {
  return (
    <StyledOption size={size} {...innerProps}>
      {Icon && (
        <IconWrapper size={size}>
          {/* @ts-ignore */}
          <Icon />
        </IconWrapper>
      )}

      <StyledCountryName size={size}> {label} </StyledCountryName>
      <StyledCountryPhoneCode> {phoneCode} </StyledCountryPhoneCode>
    </StyledOption>
  );
};
