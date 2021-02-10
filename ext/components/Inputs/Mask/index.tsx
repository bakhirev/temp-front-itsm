import React, { useState, ReactNode, FocusEvent, FC } from 'react';

import type { Status, Size } from '../common';

import { DEFAULT_MASK, DEFAULT_WIDTH } from './constants';
import { MaskField } from './MaskField';
import { Wrapper } from './StyledComponents';

export interface IInputMaskProps {
  /** Подсказка в поле ввода */
  placeholder?: string;
  /** Значение инпута */
  value: any;
  /** Маска инпута */
  mask?: string;
  /** Коллбек на изменение фокуса */
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  /** Коллбек на изменение  блюр */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /** Коллбек на изменение  значения инпута */
  onChange: any;
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
  /** Отключение поля ввода */
  disabled?: boolean;
  /** Статус поля ввода */
  status?: Status;
  /** Ширина инпута */
  width?: string | number;
  /** Дополнительный текст инпута */
  additionalText?: string;
  /** Размер инпута */
  size?: Size;
  /** Лейбел инпута */
  label?: string;
  /** Иконка для инпута */
  icon?: ReactNode;
  /** Отображать ли иконку ошибки */
  errorIcon?: boolean;
  /** Внешний реф */
  refInput?: any;
  /** Колбек возвращает value когда закончен ввод по маске */
  onComplete?: (value: any) => void;
  /** Колбек для форматирования value */
  formatValue?: (value: Date | Date[] | string) => string;
  /** Колбек для деформатирования value */
  removeFormatValue?: (value: string, value2?: string) => Date | Array<Date | null> | string | null;
  /** Показывать всегда маску */
  alwaysShowMask?: boolean;
  /** Уникальный идентификатор */
  id?: string;
}

export const InputMask: FC<IInputMaskProps> = ({
  placeholder = '',
  value = '',
  mask = DEFAULT_MASK,
  onChange,
  disabled,
  dataTestId,
  className,
  width = DEFAULT_WIDTH,
  refInput,
  ...props
}: IInputMaskProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <Wrapper
      disabled={disabled}
      width={width}
      focused={focused}
      className={className}
      data-test-id={dataTestId}
    >
      <MaskField
        placeholder={placeholder}
        value={value}
        mask={mask}
        width={width}
        setFocused={setFocused}
        onChange={onChange}
        focused={focused}
        refInput={refInput}
        disabled={disabled}
        {...props}
      />
    </Wrapper>
  );
};
