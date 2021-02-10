import React, { ReactNode, FC, useRef } from 'react';
import ReactSelect from 'react-select';

import { colorStyles } from './style';
import {
  ClearIndicator,
  ControlComponent,
  DropdownIndicator,
  IndicatorsContainer,
  Menu,
  MenuList,
  NoOptionsMessage,
  Option,
  OptionProduct,
  Placeholder,
  SelectContainerComponent,
  SingleValue,
  ValueContainer,
} from './components';
import * as SelectConstants from './constants';

export interface ISelectComponentItem<T = any> {
  /** Подпись к опции */
  label: string | number;
  /** Уникальное значение опции */
  value: T;
  /** Выбор опции */
  isSelected?: boolean;
  /** Отключение опции */
  isDisabled?: boolean;
  /** Фокус опции */
  isFocused?: boolean;
  /** Иконка для опции. Используется в обычном селекте */
  icon?: ReactNode;
  /** Подпись для продукта и карты */
  note?: ReactNode;
  /** Путь до изображения продукта / карты */
  image?: ReactNode;
  /** Добавить знак валюты */
  currency?: string | SelectConstants.SelectCurrency;
}

export interface ISelectComponentProps {
  /** Список опций */
  list: ISelectComponentItem[];
  /** Коллбэк на изменение значения селекта */
  onChange?: (value: any) => void;
  /** Коллбэк при потере селектом фокуса */
  onBlur?: (value: any) => void;
  /** Коллбэк при установке фокуса на селект */
  onFocus?: (e: any) => void;
  /** Уникальное имя инпута */
  name?: string;
  /** Верхняя надпись к селекту */
  label?: string;
  /** Плейсхолдер селекта */
  placeholder?: string;
  /** Дополнительный текст под селектом */
  additionalText?: string;
  /** Ширина селекта */
  width?: string | number;
  /** Размер компонента */
  size?: SelectConstants.Size;
  /** Отключение компонента */
  disabled?: boolean;
  /** Открытие меню */
  menuIsOpen?: boolean;
  /** Селект с возможностью очищения, по умолчанию false */
  clearable?: boolean;
  /** Селект в состоянии ошибки */
  error?: boolean;
  /** Дефолтное значение селекта */
  defaultValue?: ISelectComponentItem;
  /** Значение селекта */
  value?: ISelectComponentItem;
  /** Сообщение, которое будет выведено в меню при отсутствии опций */
  withoutOptionMessage?: string;
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
  /** Тип селекта */
  type?: SelectConstants.SelectType;
  /** Должен ли происходить скролл страницы, если при открытии меню выпадающему списку не хватает места */
  menuShouldScrollIntoView?: boolean;
  /** Контейнер, в котором при необходимости можно отрисовать тултип через ReactDOM.createPortal */
  tooltipContainer?: Element | null;
}

export const Select: FC<ISelectComponentProps> = (props) => {
  const {
    placeholder = '',
    label,
    disabled,
    list,
    menuIsOpen,
    onChange,
    defaultValue,
    clearable = false,
    withoutOptionMessage = 'Варианты не найдены',
    size = 'big',
    additionalText,
    error = false,
    width = SelectConstants.SELECT_DEFAULT_WIDTH,
    name,
    value,
    onFocus,
    onBlur,
    className,
    dataTestId,
    type = 'default',
    menuShouldScrollIntoView = false,
    tooltipContainer,
  } = props;

  const isProductOrCardType = ['card', 'product'].includes(type);
  const tooltipPlaceholderRef = useRef(null);

  return (
    <ReactSelect
      components={{
        SelectContainer: SelectContainerComponent,
        Menu,
        IndicatorsContainer,
        DropdownIndicator,
        ClearIndicator,
        NoOptionsMessage,
        Option: isProductOrCardType ? OptionProduct : Option,
        Control: ControlComponent,
        Placeholder,
        ValueContainer,
        MenuList,
        SingleValue,
      }}
      menuShouldScrollIntoView={menuShouldScrollIntoView}
      isSearchable={false}
      label={label}
      name={name}
      value={value}
      defaultValue={defaultValue}
      menuIsOpen={!disabled && menuIsOpen}
      options={list}
      styles={colorStyles(props)}
      isDisabled={disabled}
      placeholder={placeholder}
      onChange={(item) => onChange && onChange(item && (item as ISelectComponentItem).value)}
      onFocus={onFocus}
      onBlur={onBlur}
      isClearable={clearable}
      withoutOptionMessage={withoutOptionMessage}
      size={isProductOrCardType ? 'big' : size}
      error={error}
      additionalText={additionalText}
      width={width}
      className={className}
      dataTestId={dataTestId}
      type={type}
      tooltipPlaceholderRef={tooltipPlaceholderRef}
      tooltipContainer={tooltipContainer}
    />
  );
};

export { SelectConstants };
