import { ReactNode } from 'react';

export type SelectType = 'default' | 'product' | 'card';
export type Size = 'big' | 'small' | 'micro';

export const VALUE_CONTAINER_MARGIN_RIGHT = '8px';
export const LABEL_MARGIN_BOTTOM = '8px';
export const ADDITIONAL_TEXT_MARGIN_TOP = '8px';
export const BOTTOM_LINE_HEIGHT_ON_FOCUS = '2px';
export const SELECT_DEFAULT_WIDTH = '320px';
export const CLOSE_ICON_MARGIN_RIGHT = '4px';
export const ICON_DEFAULT_SIZE = 24;
export const ICON_MICRO_SIZE = 20;

export const ICON_MARGIN_RIGHT_DEFAULT = '12px';
export const ICON_MARGIN_RIGHT_MICRO = '8px';

export const CONTROL_HEIGHT = {
  micro: '32px',
  small: '40px',
  big: '56px',
};
export const OPTION_HEIGHT = {
  micro: '32px',
  small: '40px',
  big: '48px',
};

export const OPTION_PADDING = {
  micro: '6px 12px',
  small: '8px 16px',
  big: '12px 16px',
};
export const CONTROL_PADDING = (type = 'default') => ({
  micro: '6px 11px',
  small: '8px 15px',
  big: `${type === 'default' ? '12px 15px' : '10px 15px'}`,
});

export const MAX_LINES_AMOUNT_IN_MENU = 8;
export const MENU_VERTICAL_PADDING = '8px';
export const MENU_MAX_HEIGHT = {
  micro: `${
    parseInt(OPTION_HEIGHT.micro) * MAX_LINES_AMOUNT_IN_MENU + parseInt(MENU_VERTICAL_PADDING) * 2
  }px`,
  small: `${
    parseInt(OPTION_HEIGHT.small) * MAX_LINES_AMOUNT_IN_MENU + parseInt(MENU_VERTICAL_PADDING) * 2
  }px`,
  big: `${
    parseInt(OPTION_HEIGHT.big) * MAX_LINES_AMOUNT_IN_MENU + parseInt(MENU_VERTICAL_PADDING) * 2
  }px`,
};

export type SelectCurrency = 'usd' | 'eur' | 'rur';

export const currencyToSymbol: {
  [key in SelectCurrency]: string | ReactNode;
} = {
  usd: '$',
  eur: '€',
  rur: '₽',
};

export const PRODUCT_OPTION_ICON_SPACING = 12;

export const PRODUCT_OPTION_ICON = {
  product: { width: 32, height: 32, radius: '50%' },
  card: { width: 44, height: 28, radius: '2px' },
};
