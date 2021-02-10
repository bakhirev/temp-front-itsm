import React, { FC } from 'react';
import { SingleValueProps } from 'react-select';

import { StyledSingleValue, IconWrapper } from '../StyledComponents/SingleValue';
import { ReactComponent as EmptyFlag } from '../flags/EmptyFlag.svg';

import type { ISelectComponentItem } from './CountryDropdown';

export const SingleValue: FC<SingleValueProps<ISelectComponentItem>> = ({
  selectProps: { size, isDisabled },
  data: { icon: Icon },
}) => {
  return (
    <StyledSingleValue>
      {Icon && (
        <IconWrapper size={size}>
          {/* @ts-ignore */}
          {isDisabled ? <EmptyFlag /> : <Icon />}
        </IconWrapper>
      )}
    </StyledSingleValue>
  );
};
