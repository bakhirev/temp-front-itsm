import React from 'react';
import { components } from 'react-select';

import { ValueWrapper } from './simple/ValueWrapper';
import { SingleValueWrapper } from './simple/SingleValueWrapper';
import { SelectWrapper } from './simple/SelectWrapper';
import { ControlWrapper } from './simple/ControlWrapper';

export const SelectContainer = (props: any) => {
  const {
    children,
    selectProps: { className, size, id, dataTestId },
  } = props;
  return (
    <SelectWrapper className={className} id={id} size={size} data-test-id={dataTestId}>
      <components.SelectContainer {...{ ...props, className: '' }}>
        {children}
      </components.SelectContainer>
    </SelectWrapper>
  );
};

export const Control = ({ innerRef, innerProps, selectProps: { size }, children }: any) => (
  <ControlWrapper ref={innerRef} {...innerProps} size={size}>
    {children}
  </ControlWrapper>
);

export const SingleValue = ({ children }: any) => (
  <SingleValueWrapper>{children}</SingleValueWrapper>
);

export const ValueContainer = ({ children }: any) => <ValueWrapper>{children}</ValueWrapper>;

export const Placeholder = () => <div />;
