import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Input } from '../BaseField';
import type { IInputDefaultProps } from '../common/interface';
import { KEY_CODES } from '../../common';

import {
  formatValue,
  getCaretPosAfterDigitInput,
  getSlideLeftCaretPos,
  getSlideRightCaretPos,
  getUtmostLeftPossiblePos,
  reFormatValue,
  shouldSlideLeftBeforeBackspace,
  shouldSlideRightBeforeDelete,
  updateNumberOnValueChange,
} from './utils';
import { CountryDropdown as CountryDropdownSelect } from './components/CountryDropdown';

export interface IInputPhoneCountry extends IInputDefaultProps {
  /** Значение инпута */
  value: string | undefined;
  /** Дополнительная иконка */
  icon?: ReactNode;
}

export const InputPhoneCountry: FC<IInputPhoneCountry> = ({
  value = '',
  disabled,
  status,
  size = 'big',
  onChange,
  width = 'inherit',
  ...props
}) => {
  const [phoneCode, setPhoneCode] = useState('+7');
  const [phoneNumber, setPhoneNumber] = useState('');
  const ref = useRef<HTMLInputElement>(null);
  const [caretPosAfterValueChange, setCaretPosAfterValueChange] = useState<number | null>(null);

  useEffect(() => {
    if (!caretPosAfterValueChange) {
      return;
    }
    updateCaretPosition(caretPosAfterValueChange);
    setCaretPosAfterValueChange(null);
  }, [value]);

  const onCountrySelect = (option) => {
    const { phoneCode } = option;
    setPhoneCode(phoneCode);
    const newValue = reFormatValue(formatValue({ phoneCode, phoneNumber }));
    onChange?.(
      // react-select does not pass an event as onChange argument
      { target: { value: newValue } } as ChangeEvent<HTMLInputElement>,
      newValue
    );
  };

  const onValueChange = (_, value) => {
    const reFormattedValue = reFormatValue(value);
    const reFormattedPhoneCode = reFormatValue(phoneCode);
    const newPhoneNumber = updateNumberOnValueChange(reFormattedValue, reFormattedPhoneCode);
    setPhoneNumber(newPhoneNumber);
    onChange?.(_, reFormattedValue);
  };

  const updateCaretPosition = (position) => {
    const { current } = ref;
    if (!current) {
      return;
    }

    current.focus();
    current.setSelectionRange(position, position);
  };

  const getCaretPosition = () => {
    const { current } = ref;
    if (!current) {
      return 0;
    }

    return current.selectionStart || 0;
  };

  const onFocus = () => {
    const { current } = ref;
    if (!current) {
      return;
    }

    const phoneCodeEnd = getUtmostLeftPossiblePos(phoneCode);
    if (getCaretPosition() < phoneCodeEnd) {
      current.setSelectionRange(phoneCodeEnd, phoneCodeEnd);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>): void | boolean => {
    const { current } = ref;
    if (!current) {
      return;
    }

    const inputElement = event.target;
    // @ts-ignore
    const caretPosition = inputElement.selectionStart;
    const phoneNumberStart = getUtmostLeftPossiblePos(phoneCode);

    if ([KEY_CODES.HOME, KEY_CODES.UP].includes(event.keyCode)) {
      updateCaretPosition(phoneNumberStart);
      event.preventDefault();
      return false;
    }

    if (event.keyCode === KEY_CODES.BACKSPACE && caretPosition <= phoneNumberStart) {
      event.preventDefault();
      return false;
    }

    if (event.keyCode === KEY_CODES.LEFT) {
      updateCaretPosition(getSlideLeftCaretPos(getCaretPosition(), phoneCode));
      event.preventDefault();
      return false;
    }

    if (event.keyCode === KEY_CODES.RIGHT) {
      updateCaretPosition(getSlideRightCaretPos(getCaretPosition(), phoneCode));
      event.preventDefault();
      return false;
    }

    if (KEY_CODES.ZERO <= event.keyCode && event.keyCode <= KEY_CODES.NINE && !event.shiftKey) {
      setCaretPosAfterValueChange(getCaretPosAfterDigitInput(getCaretPosition(), phoneCode));
      return true;
    }

    if (event.keyCode === KEY_CODES.BACKSPACE) {
      shouldSlideLeftBeforeBackspace(getCaretPosition(), phoneCode) &&
        updateCaretPosition(getSlideLeftCaretPos(getCaretPosition(), phoneCode));
      setCaretPosAfterValueChange(getSlideLeftCaretPos(getCaretPosition(), phoneCode));
      return true;
    }

    if (event.keyCode === KEY_CODES.DELETE) {
      shouldSlideRightBeforeDelete(getCaretPosition(), phoneCode) &&
        updateCaretPosition(getSlideRightCaretPos(getCaretPosition(), phoneCode));
      setCaretPosAfterValueChange(getCaretPosition());
      return true;
    }
  };

  return (
    <Input
      size={size}
      disabled={disabled}
      status={status}
      onClick={onFocus}
      onFocus={onFocus}
      onChange={onValueChange}
      value={formatValue({ phoneCode, phoneNumber })}
      countrySelectComponent={CountryDropdownSelect}
      onCountrySelect={onCountrySelect}
      refInput={ref}
      onKeyDown={onKeyDown}
      {...props}
    />
  );
};
