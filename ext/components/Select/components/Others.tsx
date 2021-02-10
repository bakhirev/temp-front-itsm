import React, { FC } from 'react';
import { components, PlaceholderProps, ControlProps } from 'react-select';

import { ISelectComponentItem } from '../index';

import {
  Wrapper,
  Label,
  SelectContainer,
  PlaceholderWrapper,
  AdditionalText,
  SelectControl,
  TooltipPlaceholder,
} from './styled-components/otherComponents';

export type IPlaceholderProps = PlaceholderProps<ISelectComponentItem, false> & {
  menuIsOpen?: boolean;
};

export const SelectContainerComponent: FC<any> = (props) => {
  const {
    isFocused,
    children,
    selectProps: {
      name,
      error,
      size,
      label,
      width,
      className,
      isDisabled,
      additionalText,
      dataTestId,
      tooltipPlaceholderRef,
    },
  } = props;
  const SelectWrapper = Wrapper(size);

  return (
    <SelectWrapper width={width} className={className} data-test-id={dataTestId}>
      {label && (
        <Label htmlFor={name} disabled={isDisabled} focused={isFocused}>
          {label}
        </Label>
      )}
      <SelectContainer>
        <components.SelectContainer {...props} className="">
          {children}
        </components.SelectContainer>
      </SelectContainer>
      <TooltipPlaceholder ref={tooltipPlaceholderRef} />
      {additionalText && (
        <AdditionalText error={error} disabled={isDisabled} focused={isFocused}>
          {additionalText}
        </AdditionalText>
      )}
    </SelectWrapper>
  );
};

export const ControlComponent: FC<ControlProps<ISelectComponentItem, false>> = ({
  innerRef,
  innerProps,
  isDisabled,
  isFocused,
  children,
  selectProps: { size, menuIsOpen, error, type },
}) => (
  <SelectControl
    $type={type}
    ref={innerRef}
    menuIsOpen={menuIsOpen}
    size={size}
    disabled={isDisabled}
    focused={isFocused}
    error={error}
    {...innerProps}
  >
    {children}
  </SelectControl>
);

export const Placeholder: FC<IPlaceholderProps> = ({
  menuIsOpen,
  isFocused,
  selectProps: { isDisabled, placeholder },
}) => (
  <PlaceholderWrapper menuIsOpen={menuIsOpen} disabled={isDisabled} focused={isFocused}>
    {placeholder}
  </PlaceholderWrapper>
);
