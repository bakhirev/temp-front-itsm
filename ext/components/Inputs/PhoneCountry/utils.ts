const PHONE_NUMBER_FORMAT_MASK = '(999) 999 9999';

const formatPhoneNumber = (phoneNumberString) => {
  const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  const chars = cleaned.length;
  if (!chars) {
    return '(';
  }

  if (chars < 3) {
    return `(${cleaned}`;
  }

  if (chars === 3) {
    return `(${cleaned})`;
  }

  if (chars <= 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}`;
  }

  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)} ${cleaned.slice(6, Math.min(10))}`;
};

export const formatValue = ({ phoneCode, phoneNumber }) => {
  return `${phoneCode} ${formatPhoneNumber(phoneNumber)}`;
};

export const reFormatValue = (value) => (value || '').replace(/[() ]/g, '');

export const updateNumberOnValueChange = (value, phoneCode) => {
  return value.replace(phoneCode, '');
};

export const getUtmostLeftPossiblePos = (phoneCode) => {
  return formatValue({ phoneCode, phoneNumber: '' }).length;
};

// in formatted display value
export const getSlideRightCaretPos = (curCaretPos, phoneCode) => {
  const mockFormattedValue = formatValue({ phoneCode, phoneNumber: PHONE_NUMBER_FORMAT_MASK });
  for (let caret = curCaretPos + 1; caret < mockFormattedValue.length; caret++) {
    if (mockFormattedValue[caret] === '9') {
      return caret;
    }
  }

  return mockFormattedValue.length;
};

// in formatted display value
export const getSlideLeftCaretPos = (curCaretPos, phoneCode) => {
  const utmostLeftPossiblePos = formatValue({ phoneCode, phoneNumber: '' }).length;
  if (curCaretPos <= utmostLeftPossiblePos) {
    return utmostLeftPossiblePos;
  }

  const mockFormattedValue = formatValue({ phoneCode, phoneNumber: PHONE_NUMBER_FORMAT_MASK });
  for (let caret = curCaretPos - 1; caret >= utmostLeftPossiblePos; caret--) {
    if (['(', '9'].includes(mockFormattedValue[caret - 1])) {
      return caret;
    }
  }

  return utmostLeftPossiblePos;
};

// in formatted display value
export const getCaretPosAfterDigitInput = (curCaretPos, phoneCode) => {
  const mockFormattedValue = formatValue({ phoneCode, phoneNumber: PHONE_NUMBER_FORMAT_MASK });

  if (curCaretPos === mockFormattedValue.length - 1) {
    return mockFormattedValue.length;
  }

  for (let caret = curCaretPos + 1; caret < mockFormattedValue.length; caret++) {
    if (mockFormattedValue[caret - 1] === '9') {
      return caret;
    }
  }

  return mockFormattedValue.length;
};

export const shouldSlideLeftBeforeBackspace = (curCaretPos, phoneCode) => {
  const mockFormattedValue = formatValue({ phoneCode, phoneNumber: PHONE_NUMBER_FORMAT_MASK });
  const utmostLeftPossiblePos = formatValue({ phoneCode, phoneNumber: '' }).length;
  return curCaretPos > utmostLeftPossiblePos && mockFormattedValue[curCaretPos - 1] !== '9';
};

export const shouldSlideRightBeforeDelete = (curCaretPos, phoneCode) => {
  const mockFormattedValue = formatValue({ phoneCode, phoneNumber: PHONE_NUMBER_FORMAT_MASK });
  const utmostRightPossiblePos = mockFormattedValue.length;
  return curCaretPos < utmostRightPossiblePos && mockFormattedValue[curCaretPos] !== '9';
};
