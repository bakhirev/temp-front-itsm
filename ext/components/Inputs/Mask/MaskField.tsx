import React, {
  useRef,
  useEffect,
  useState,
  FocusEvent,
  Dispatch,
  FC,
  ReactNode,
  MutableRefObject,
  ChangeEvent,
  useCallback,
} from 'react';

import { StyledErrorSolid } from '../Text/StyledErrorSolid';
import { Body2Short } from '../../Typography';
import type { Status, Size } from '../common';
import { KEY_CODES } from '../../common';

import { ICON_SIZE_DEFAULT, ICON_SIZE_MICRO } from './constants';
import { getCodePhoneLength, getPhoneNumber, checkPhoneMask, checkMaskFilled } from './utils';
import { PlaceholderMask } from './PlaceholderMask';
import {
  formatValueInMaskValue,
  unFormatValue,
  formatValueOnComplete,
  getInputValue,
} from './MaskUtils';
import {
  Label,
  LabelText,
  StyledInput,
  AdditionalText,
  IconWrapper,
  InputWrapper,
  InputBox,
} from './StyledComponents';

interface IInputMaskFieldProps {
  /** Имя класса для переопределения стилей */
  className?: string;
  /** Лейбел инпута */
  label?: string;
  /** Подсказка в поле ввода */
  placeholder: string;
  /** Коллбек на изменение  значения инпута */
  onChange: any;
  /** Маска инпута */
  mask: string;
  /** Значение инпута */
  value: any;
  /** Коллбек на изменение фокуса */
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  /** Коллбек на изменение  блюр */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /** Обработчи для переключения флага focused */
  setFocused: Dispatch<React.SetStateAction<boolean>>;
  /** Флаг  фокусе инпут или нет */
  focused: boolean;
  /** Отключение поля ввода */
  disabled?: boolean;
  /** Статус поля ввода */
  status?: Status;
  /** Ширина инпута */
  width?: string | number;
  /** Дополнительный текст инпута */
  additionalText?: string;
  /** Иконка для инпута */
  icon?: ReactNode;
  /** Размер инпута */
  size?: Size;
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

export const MaskField: FC<IInputMaskFieldProps> = ({
  className,
  label,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  setFocused,
  alwaysShowMask,
  focused,
  disabled,
  status = 'default',
  additionalText,
  size = 'big',
  mask,
  icon,
  errorIcon,
  refInput,
  value = '',
  onComplete,
  formatValue,
  id,
  removeFormatValue,
}) => {
  const [prevInput, setPrevInput] = useState({ value: '', cursorStart: 0 });
  const [errorActive, setErrorActive] = useState(true);
  const [keyDown, setKeyDown] = useState(false);

  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

  const inputValue: any = getInputValue(value, mask, focused, formatValue);

  const handleComplete = useCallback(() => {
    onComplete && onComplete(formatValueOnComplete(inputValue, mask, removeFormatValue));
  }, [inputValue, mask, onComplete]);

  useEffect(() => {
    if (checkMaskFilled(mask, inputValue)) {
      handleComplete();
    }
    if (!refInput) {
      if (inputRef.current && prevInput.value !== inputValue) {
        const position = prevInput.cursorStart;
        inputRef.current.setSelectionRange(position, position);
      }
    } else {
      if (refInput.current && prevInput.value !== inputValue) {
        if (inputValue.length === mask.length && !keyDown) {
          refInput.current.setSelectionRange(inputValue.length, inputValue.length);
        } else {
          const position = prevInput.cursorStart;
          refInput.current.setSelectionRange(position, position);
        }
      }
    }
  }, [handleComplete, inputValue, prevInput.cursorStart, prevInput.value]);

  const handleClick = (event: any) => {
    const code = getCodePhoneLength(mask);
    if (event.target.selectionStart < code) {
      event.target.setSelectionRange(code, code);
    }
  };

  const handleKeyUp = (event: any) => {
    const code = getCodePhoneLength(mask);

    if (checkPhoneMask(mask) && event.target.selectionStart < code) {
      event.target.setSelectionRange(code, code);
    }
  };

  const handleKeyDown = (event: any) => {
    const code = getCodePhoneLength(mask);
    setKeyDown(true);
    if (event.keyCode === KEY_CODES.ENTER) {
      inputRef.current?.blur();
      refInput?.current?.blur();
    }
    if (checkPhoneMask(mask) && event.target.selectionStart < code) {
      event.target.setSelectionRange(code, code);
      if (event.target.selectionStart <= code && event.keyCode === KEY_CODES.BACKSPACE) {
        onChange({ value: '', masked: '' });
      }
    }
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    onFocus?.(event);
    setErrorActive(false);
    setFocused(true);
    if (checkPhoneMask(mask)) {
      handleChange(event);
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    onBlur?.(event);
    setFocused(false);
    setKeyDown(false);
    setErrorActive(true);
    if (checkPhoneMask(mask) && value.length <= getPhoneNumber(mask).length) {
      onChange({ value: '', masked: '' });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputRef = event.target;
    let inputValue;
    if (checkPhoneMask(mask) && value === '') {
      inputValue = getPhoneNumber(mask);
    } else {
      inputValue = inputRef.value;
    }

    const cursorStart = formatValueInMaskValue(
      unFormatValue(inputValue.slice(0, inputRef.selectionStart), mask),
      mask
    ).length;

    setPrevInput({ value: inputValue, cursorStart });

    const newValue = unFormatValue(inputValue, mask);

    if (value !== newValue) {
      onChange({
        value: newValue,
        masked: formatValueInMaskValue(newValue, mask),
      });
    }
  };

  const iconSize = 'micro' === size ? ICON_SIZE_MICRO : ICON_SIZE_DEFAULT;
  const isPlaceholder = !focused && inputValue?.length === 0 ? placeholder : undefined;

  return (
    <InputWrapper>
      <Label className={className}>
        {label && (
          <LabelText>
            <Body2Short>{label}</Body2Short>
          </LabelText>
        )}
        <InputBox focused={focused} disabled={disabled} size={size} status={status}>
          <PlaceholderMask
            alwaysShowMask={alwaysShowMask}
            visibleValue={inputValue}
            mask={mask}
            size={size}
            focused={focused}
            disabled={disabled}
          />

          <StyledInput
            $size={size}
            disabled={disabled}
            id={id ? id : 'input-mask'}
            focused={focused}
            placeholder={isPlaceholder}
            ref={refInput === undefined ? inputRef : refInput}
            onChange={handleChange}
            value={inputValue}
            onKeyUp={handleKeyUp}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={handleClick}
            autoComplete="off"
          />
          <IconWrapper>
            {icon && !errorIcon && icon}
            {status === 'error' && errorIcon && !disabled && (
              <StyledErrorSolid width={iconSize} $active={!errorActive} />
            )}
          </IconWrapper>
        </InputBox>
        {additionalText && !disabled && (
          <AdditionalText disabled={disabled} status={status} focused={focused}>
            <Body2Short>{additionalText}</Body2Short>
          </AdditionalText>
        )}
      </Label>
    </InputWrapper>
  );
};
