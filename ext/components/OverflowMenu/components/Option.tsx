import React, { useState, useRef, useEffect } from 'react';

import { createTooltipHOC } from '../../TooltipHOC';

import { OptionText } from './simple/OptionText';
import { OptionWrapper } from './simple/OptionWrapper';

export const Option = ({
  children,
  isSelected,
  isDisabled,
  isFocused,
  data,
  innerProps,
  selectProps: { tooltipContainer },
}: any) => {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const [overflow, setOverflow] = useState(false);

  const detectOverflow = (e: any) => e.offsetWidth < e.scrollWidth;

  useEffect(() => {
    const contentCurrent = contentRef.current;

    if (contentCurrent && detectOverflow(contentCurrent) !== overflow) {
      setOverflow(detectOverflow(contentCurrent));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const OptionContent = overflow ? createTooltipHOC(OptionText) : OptionText;
  return (
    <OptionWrapper
      ref={wrapperRef}
      disabled={data.isDisabled || isDisabled}
      selected={data.isSelected || isSelected}
      focused={data.isFocused || isFocused}
      {...innerProps}
    >
      <OptionContent
        ref={contentRef}
        tooltip={data.label}
        target={wrapperRef.current}
        container={tooltipContainer}
      >
        {children}
      </OptionContent>
    </OptionWrapper>
  );
};
