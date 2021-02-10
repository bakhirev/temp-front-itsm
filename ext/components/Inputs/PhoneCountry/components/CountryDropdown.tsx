import React, { ReactNode } from 'react';
import ReactSelect from 'react-select';

import { phoneCodes } from '../flags/phoneCodes';
import * as FlagIcons from '../flags';

import {
  ValueContainer,
  IndicatorsContainer,
  Control,
  SelectContainer,
  Menu,
  MenuList,
} from './others';
import { Option } from './Option';
import { SingleValue } from './SingleValue';
import { DropdownIndicator } from './DropdownIndicator';

export interface ICountryDropdown {
  onCountrySelect: Function;
  width: number;
  disabled?: boolean;
  size?: any;
  focused?: boolean;
  error?: false;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  menuIsOpen?: boolean;
}

export interface ISelectComponentItem {
  /** Подпись к опции */
  label: string | number;
  /** Уникальное значение опции */
  value: any;
  /** Телефонный код страны */
  phoneCode: any;
  /** Выбор опции */
  isSelected?: boolean;
  /** Отключение опции */
  isDisabled?: boolean;
  /** Фокус опции */
  isFocused?: boolean;
  /** Иконка для опции. Используется в обычном селекте */
  icon?: ReactNode;
}

const optionsList = Object.keys(FlagIcons)
  .map((componentName) => {
    const countryName = componentName.replace('Icon', '');
    const countryInfo = phoneCodes.find(
      ({ name }) => countryName.toLowerCase() === name.toLowerCase().replace(/[-'",. ]/g, '')
    );

    return {
      label: countryInfo?.russianName || countryName,
      value: countryName,
      icon: FlagIcons[componentName],
      phoneCode: countryInfo?.dial_code,
    };
  })
  .sort((a, b) => {
    if (a.label > b.label) return 1;
    if (a.label < b.label) return -1;
    return 0;
  });

export const CountryDropdown: React.FC<ICountryDropdown> = ({
  onCountrySelect,
  size,
  disabled,
  focused,
  error,
  onFocus,
  onBlur,
  onMenuOpen,
  onMenuClose,
  menuIsOpen,
  width,
}) => {
  return (
    <ReactSelect
      components={{
        SelectContainer,
        Menu,
        MenuList,
        IndicatorsContainer,
        DropdownIndicator,
        Option,
        IndicatorSeparator: () => null,
        ValueContainer,
        Control,
        SingleValue,
      }}
      defaultValue={
        disabled
          ? null
          : {
              value: 'Russia',
              label: 'Россия +7',
              phoneCode: '+7',
              icon: FlagIcons.Russia,
            }
      }
      options={optionsList}
      onChange={(item) => onCountrySelect && onCountrySelect(item as ISelectComponentItem)}
      onFocus={onFocus}
      onBlur={onBlur}
      isClearable={false}
      isSearchable={false}
      placeholder={null}
      size={size}
      isDisabled={disabled}
      isFocused={focused}
      error={error}
      onMenuOpen={onMenuOpen}
      onMenuClose={onMenuClose}
      menuIsOpen={menuIsOpen}
      menuWidth={width}
    />
  );
};
