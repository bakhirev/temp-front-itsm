import {
  formatValueOnlyNum,
  checkValidationMask,
  formatValue,
  checkPhoneMask,
  getPhoneNumber,
} from './utils';

export const maskPattern: any = {
  '9': new RegExp('[0-9]'),
  a: new RegExp('[a-z]'),
  A: new RegExp('[A-Z]'),
};

export const checkCharInMaskPattern = (char: string, patterns: any) => {
  for (const key in patterns) {
    if (key === char) {
      return true;
    }
  }
  return false;
};

export const formatValueInMaskValue = (
  valueInput: string,
  mask: string,
  patterns = maskPattern
) => {
  let newValue = '';
  let value;
  if (mask.search(/[a-z-A-Z]/g) !== -1) {
    value = formatValue(valueInput);
  } else {
    value = formatValueOnlyNum(valueInput);
  }
  for (let i = 0, j = 0; j < mask.length && i < value.length; i++, j++) {
    if (checkCharInMaskPattern(mask[j], patterns)) {
      if (patterns[mask[j]].test(value[i])) {
        newValue += value[i];
      }
    } else {
      newValue += mask[j];
      if (mask[j] !== value[i]) {
        i--;
      }
    }
  }

  const code = mask.slice(0, mask.indexOf('(') + 1);

  if (mask.indexOf('(') !== -1) {
    if (newValue.length <= code.length) {
      newValue = code;
    }
  }

  return newValue;
};

export const unFormatValue = (value = '', mask = '') => {
  if (checkValidationMask(mask, value)) {
    const maskLength = formatValueOnlyNum(mask).length;

    return formatValueOnlyNum(value).slice(0, maskLength);
  } else {
    if (mask.search(/[a-z-A-Z]/g) !== -1) {
      return formatValue(value);
    } else {
      return formatValueOnlyNum(value);
    }
  }
};

export const formatValueOnComplete = (
  value: string,
  mask: string,
  removeFormatValue?: (value: string, value2?: string) => Date | Array<Date | null> | string | null
) => {
  const newValue = formatValueInMaskValue(unFormatValue(value, mask), mask);

  if (removeFormatValue && mask.split('-').length === 1) {
    return removeFormatValue(newValue);
  } else if (removeFormatValue && mask.split('-').length > 1) {
    const res = newValue.split('-');
    return removeFormatValue(res[0], res[1].trim());
  } else {
    return unFormatValue(value, mask);
  }
};

export const getInputValue = (
  value = '',
  mask: string,
  focused: boolean,
  formatValue?: (value: Date | Date[] | string) => string
) => {
  let newValue: any = value;

  if ((newValue instanceof Date && formatValue) || (Array.isArray(newValue) && formatValue)) {
    newValue = formatValue(value);
  }
  if (value === null) {
    newValue = '';
  }

  if (checkPhoneMask(mask) && value.length < getPhoneNumber(mask).length && !focused) {
    return '';
  } else {
    return formatValueInMaskValue(newValue, mask);
  }
};
