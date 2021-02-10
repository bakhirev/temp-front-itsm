import React, { useState, Dispatch, SetStateAction, ReactNode, FC } from 'react';

import { createTooltipHOC } from '../../TooltipHOC';
import { Body2Short } from '../../Typography';
import { IInputDefaultProps, useTooltipHook } from '../common';
import type { Type } from '../common/types';
import { DEFAULT_WIDTH } from '../constants';

import { InputSkeleton } from './InputSkeleton';
import { Label, Wrapper, Separator, StyledAdditionalText } from './StyledComponents';

export interface IInputProps extends IInputDefaultProps {
  /** Коллбэк на клик */
  onClick?: (event: any) => void | undefined;
  /** иконки из Figma , которые прокидываются в инпут */
  iconServices?: ReactNode;
  /** Отображение подсказки при переполнении инпута. По умолчанию false */
  withTooltip?: boolean;
  /** Тип инпута */
  type?: Type;
  /** Активна ли иконка в инпуте */
  iconIsActive?: boolean;
  /** Функция для переключения active icon */
  setIconIsActive?: Dispatch<SetStateAction<boolean>>;
  /** Использование числового инпута */
  number?: boolean;
  /** Использование Input Range */
  range?: boolean;
  /** Активен ли информер в инпуте */
  activeInformer?: boolean;
  /** Значение инпута */
  value?: any;
  /** Флаг ввода дробной части */
  withCoins?: boolean;
  phoneCountry?: boolean;
  countryIcon?: any;
  selectIcon?: any;
  onCountrySelectOpen?: Function;
  countrySelectComponent?: any;
  onCountrySelect?: Function;
  /** Дефолтное value */
  defaultValue?: any;
}

export const Input: FC<IInputProps> = ({
  disabled,
  label,
  additionalText,
  status = 'default',
  className,
  dataTestId,
  withTooltip = false,
  value = '',
  width = DEFAULT_WIDTH,
  refInput,
  tooltipContainer,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const { tooltip, ref } = useTooltipHook(refInput, withTooltip, value);

  const Input = tooltip && !focused ? createTooltipHOC(InputSkeleton) : InputSkeleton;
  const inputElement = (
    <Input
      tooltip={value}
      container={tooltipContainer}
      display="block"
      disabled={disabled}
      focused={focused}
      setFocused={setFocused}
      status={status}
      value={value}
      ref={ref}
      width={width}
      {...props}
    />
  );

  return (
    <Wrapper
      disabled={disabled}
      focused={focused}
      className={className}
      data-test-id={dataTestId}
      width={width}
    >
      <Label>
        {label && (
          <>
            <Body2Short>{label}</Body2Short>
            <Separator />
          </>
        )}
        {inputElement}
      </Label>
      {additionalText && (
        <StyledAdditionalText disabled={disabled} status={status} focused={focused}>
          <Body2Short>{additionalText}</Body2Short>
        </StyledAdditionalText>
      )}
    </Wrapper>
  );
};
