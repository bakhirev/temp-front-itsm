import React, { FC, useState, FocusEvent } from 'react';
import Select from 'react-select';

import {
  OverflowMenuSize,
  OverflowMenuAlignment,
  MENU_SIZES,
  MENU_WIDTH,
  MENU_MARGIN_TOP,
} from './constants';
import {
  Menu,
  MenuList,
  Option,
  DropMenuStyles,
  DropdownIndicator,
  IndicatorsContainer,
  Control,
  SelectContainer,
  SingleValue,
  ValueContainer,
  Placeholder,
} from './components';

export interface IOverflowMenuItem {
  /** Подпись к опции */
  label: string | number;
  /** Значение опции */
  value: any;
  /** Выбор опции */
  isSelected?: boolean;
  /** Отключение опции */
  isDisabled?: boolean;
  /** Фокус опции */
  isFocused?: boolean;
}

export interface IOverflowMenuMenu {
  /** Вертикальный отступ между меню и иконкой с троеточием */
  marginTop?: string | number;
  /** Ширина меню */
  width?: string | number;
  /** Выравнивание меню относительно левого или правого края иконки с троеточием */
  alignment?: OverflowMenuAlignment;
  /** Открытие меню */
  opened?: boolean;
}

export interface IOverflowMenuProps {
  /** Массив опций */
  list: IOverflowMenuItem[];
  /** Размер компонента */
  size?: OverflowMenuSize;
  /** Настройки меню */
  menu?: IOverflowMenuMenu;
  /** Коллбэк на изменение значения меню. Срабатывает при клике на опцию или нажатии Enter/Space при фокусе на опции */
  onChange?: (value: any) => void;
  /** Коллбэк при потере меню фокуса */
  onBlur?: (event: FocusEvent<HTMLElement>) => void;
  /** Коллбэк при установке фокуса на меню  */
  onFocus?: (event: FocusEvent<HTMLElement>) => void;
  /** Отключение компонента */
  disabled?: boolean;
  /** Дефолтное значение меню */
  defaultValue?: IOverflowMenuItem;
  /** Значение меню */
  value?: IOverflowMenuItem;
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
  /** Уникальный идентификатор меню */
  id?: string;
  /** ref на компонент */
  innerRef?: any;
  /** Отключение видимости контейнера с многоточием */
  hideDropdownIndicator?: boolean;
  /** Контейнер, в котором при необходимости можно отрисовать тултип через ReactDOM.createPortal */
  tooltipContainer?: Element | null;
}

export const OverflowMenu: FC<IOverflowMenuProps> = ({
  disabled,
  list,
  onChange,
  defaultValue,
  menu: { width = MENU_WIDTH, marginTop = MENU_MARGIN_TOP, alignment = 'left', opened } = {
    width: MENU_WIDTH,
    marginTop: MENU_MARGIN_TOP,
    alignment: 'left',
  },
  value,
  onFocus,
  onBlur,
  className,
  dataTestId,
  id,
  innerRef,
  size = 'big',
  hideDropdownIndicator,
  tooltipContainer,
}: IOverflowMenuProps) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = (evt: FocusEvent<HTMLElement>) => {
    onFocus && onFocus(evt);
    setFocused(true);
  };

  const handleBlur = (evt: FocusEvent<HTMLElement>) => {
    onBlur && onBlur(evt);
    setFocused(false);
  };

  const handleChange = (value: any) => {
    onChange && onChange(value);
  };

  return (
    <Select
      components={{
        SelectContainer,
        Menu,
        MenuList,
        IndicatorsContainer,
        DropdownIndicator: hideDropdownIndicator ? null : DropdownIndicator,
        ClearIndicator: null,
        Option,
        Control,
        Placeholder,
        ValueContainer,
        SingleValue,
      }}
      value={value}
      defaultValue={defaultValue}
      menuIsOpen={opened}
      isSearchable={false}
      options={list}
      styles={DropMenuStyles()}
      isDisabled={disabled || list.length === 0}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      menuWidth={width}
      menuMarginTop={marginTop}
      className={className}
      dataTestId={dataTestId}
      menuAlignment={alignment}
      id={id}
      ref={innerRef}
      size={MENU_SIZES[size]}
      isFocused={focused}
      tooltipContainer={tooltipContainer}
    />
  );
};
