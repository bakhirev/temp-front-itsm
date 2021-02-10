import React, { FC, Ref, useEffect, useMemo, useRef, useState } from 'react';
import { OptionProps } from 'react-select';

import { ISelectComponentItem } from '../index';
import { createTooltipHOC } from '../../TooltipHOC';
import { currencyToSymbol } from '../constants';

import {
  OptionProductOrCard,
  OptionWrapper,
  OptionImageComponent,
  OptionDoubleLineLabel,
  OptionEmbracedLabelLine,
  OptionAdditionalNoticeLine,
} from './styled-components/optionComponents';

export interface IOptionProductProps extends OptionProps<ISelectComponentItem, false> {
  data: ISelectComponentItem;
  innerRef: Ref<any> | null;
  innerProps: any;
}

const detectOverflow = (e: HTMLDivElement) => e.offsetWidth < e.scrollWidth;

type DivElement = HTMLDivElement | null;

export const OptionProduct: FC<IOptionProductProps> = ({
  children,
  isSelected,
  isDisabled,
  isFocused,
  data: {
    label,
    isDisabled: optionDisabled,
    isSelected: optionSelected,
    isFocused: optionFocused,
    note = null,
    image = null,
    currency = null,
  },
  innerProps,
  selectProps: { size, type, isInsideValue, tooltipPlaceholderRef, tooltipContainer },
}) => {
  const labelRef = useRef<DivElement>(null);
  const noteRef = useRef<DivElement>(null);
  const contentRef = useRef<DivElement>(null);
  const wrapperRef = useRef<DivElement>(null);
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    const labelCurrent = labelRef.current;
    const noteCurrent = noteRef.current;

    const labelOverflow = labelCurrent && detectOverflow(labelCurrent);
    const noteOverflow = noteCurrent && detectOverflow(noteCurrent);
    const contentOverflow = labelOverflow || noteOverflow;

    if (contentOverflow !== null && contentOverflow !== overflow) {
      setOverflow(contentOverflow);
    }
  }, [contentRef, labelRef, noteRef, overflow, children]);

  const OptionContent = overflow ? createTooltipHOC(OptionProductOrCard) : OptionProductOrCard;

  const isImageUrl = typeof image === 'string';
  const currencySymbol = useMemo(() => {
    if (!currency) return null;
    const cur = ['usd', 'rur', 'eur'].includes(currency.toLowerCase())
      ? currencyToSymbol[currency.toLowerCase()]
      : null;
    return cur;
  }, [currency]);
  const currencyLabel = currencySymbol ? ` ${currencySymbol}` : '';
  const tooltip = `${label}${currencyLabel}${note ? `\n${note}` : ''}`;
  return (
    <OptionWrapper
      $type={type}
      $inner={isInsideValue}
      ref={wrapperRef}
      disabled={optionDisabled || isDisabled}
      selected={optionSelected || isSelected}
      focused={optionFocused || isFocused}
      size={size}
      {...innerProps}
    >
      <OptionContent
        ref={contentRef}
        tooltip={tooltip}
        container={tooltipContainer}
        target={isInsideValue ? tooltipPlaceholderRef.current : wrapperRef.current}
      >
        <OptionImageComponent $type={type} $image={isImageUrl ? `${image}` : ''}>
          {!isImageUrl && image}
        </OptionImageComponent>
        <OptionDoubleLineLabel>
          <OptionEmbracedLabelLine ref={labelRef}>
            {children}
            {currencyLabel}
          </OptionEmbracedLabelLine>
          {note && <OptionAdditionalNoticeLine ref={noteRef}>{note}</OptionAdditionalNoticeLine>}
        </OptionDoubleLineLabel>
      </OptionContent>
    </OptionWrapper>
  );
};
