import React, { FC } from 'react';
import { SingleValueProps, ValueContainerProps } from 'react-select';

import { ISelectComponentItem } from '../index';

import { OptionProduct } from './OptionProduct';
import { Option } from './Option';
import { SingleValueWrapper, ValueContainerWrapper } from './styled-components/valueComponents';

export const SingleValue: FC<SingleValueProps<ISelectComponentItem>> = ({
  isDisabled,
  children,
  selectProps,
  data,
  ...rest
}) => {
  const { type } = selectProps;

  return (
    <SingleValueWrapper disabled={isDisabled}>
      {type === 'default' ? (
        <Option
          selectProps={{ ...selectProps, isInsideValue: true }}
          data={data}
          {...(rest as any)}
        >
          {children}
        </Option>
      ) : (
        <OptionProduct
          optionType={type}
          selectProps={{ ...selectProps, isInsideValue: true }}
          data={data}
          {...(rest as any)}
        >
          {children}
        </OptionProduct>
      )}
    </SingleValueWrapper>
  );
};

export const ValueContainer: FC<ValueContainerProps<ISelectComponentItem, false>> = ({
  children,
}) => <ValueContainerWrapper>{children}</ValueContainerWrapper>;
