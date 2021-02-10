import React, { useState, useRef, useEffect, FC } from 'react';
import { components, OptionProps } from 'react-select';

import { createTooltipHOC } from '../../TooltipHOC';
import { ISelectComponentItem } from '../index';
import { ICON_DEFAULT_SIZE, ICON_MICRO_SIZE } from '../constants';

import { OptionText, OptionWrapper, OptionIcon } from './styled-components/optionComponents';

export const Option: FC<OptionProps<ISelectComponentItem, false>> = ({
  children,
  isSelected,
  isDisabled,
  isFocused,
  data: {
    label,
    isDisabled: optionDisabled,
    isSelected: optionSelected,
    isFocused: optionFocused,
    icon: Icon,
  },
  innerProps,
  selectProps: { size, isInsideValue, tooltipPlaceholderRef, tooltipContainer },
}) => {
  const contentRef = useRef(null);
  const wrapperRef = useRef(null);
  const [overflow, setOverflow] = useState(false);

  const detectOverflow = (e: any) => e.offsetWidth < e.scrollWidth;

  useEffect(() => {
    const contentCurrent = contentRef.current;

    if (contentCurrent && detectOverflow(contentCurrent) !== overflow) {
      setOverflow(detectOverflow(contentCurrent));
    }
  }, [children]);

  const OptionContent = overflow ? createTooltipHOC(OptionText) : OptionText;
  const iconSize = size === 'micro' ? ICON_MICRO_SIZE : ICON_DEFAULT_SIZE;

  return (
    <OptionWrapper
      $inner={isInsideValue}
      ref={wrapperRef}
      disabled={optionDisabled || isDisabled}
      selected={optionSelected || isSelected}
      focused={optionFocused || isFocused}
      size={size}
      {...innerProps}
    >
      {Icon && (
        <OptionIcon size={size}>
          <Icon width={iconSize} height={iconSize} />
        </OptionIcon>
      )}
      <OptionContent
        ref={contentRef}
        tooltip={label}
        container={tooltipContainer}
        target={isInsideValue ? tooltipPlaceholderRef.current : wrapperRef.current}
      >
        {children}
      </OptionContent>
    </OptionWrapper>
  );
};

export const NoOptionsMessage: FC<any> = (props) => {
  const {
    selectProps: { withoutOptionMessage },
  } = props;
  return (
    <components.NoOptionsMessage {...props}>{withoutOptionMessage}</components.NoOptionsMessage>
  );
};
