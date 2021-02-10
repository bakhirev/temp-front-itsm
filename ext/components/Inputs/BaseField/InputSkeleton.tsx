import React, {
  forwardRef,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  ReactNode,
  useState,
  FC,
  MutableRefObject,
  RefObject,
  memo,
  useRef,
} from 'react';

import {
  useSuffixHook,
  formatValue,
  formatValueWithSeparator,
  joinIntegerWithFraction,
} from '../common';
import type { Status, Size, Type, Mask } from '../common/types';
import { Body1Short, Body2Short } from '../../Typography';
import { KEY_CODES } from '../../common/key-codes';
import { DEFAULT_WIDTH } from '../constants';

import EditableCoinsWrapper from './editable-coins';
import {
  InputWrapper,
  InputComponent,
  IconWrapper,
  UserIcon,
  Suffix,
  SeparatorDot,
  CountryPhoneInputBox,
  CountrySelectWrapper,
} from './StyledComponents';

export interface ISkeletonProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
  focused: boolean;
  setFocused: Dispatch<SetStateAction<boolean>>;
  value?: any;
  placeholder?: string;
  id?: string;
  icon?: ReactNode;
  type?: Type;
  inputName?: string;
  onClick?: (event: any) => void | undefined;
  iconServices?: ReactNode;
  size?: Size;
  status?: Status;
  width?: string | number;
  disabled?: boolean;
  onBlur?: (event: FocusEvent<HTMLInputElement>, value: string) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  activeInformer?: boolean;
  maxLength?: number;
  mask?: Mask | object | string | any;
  suffix?: string;
  iconIsActive?: boolean;
  setIconIsActive?: Dispatch<SetStateAction<boolean>>;
  number?: boolean;
  range?: boolean;
  withCoins?: boolean;
  phoneCountry?: boolean;
  countryIcon?: any;
  selectIcon?: any;
  onCountrySelectOpen?: Function;
  countrySelectComponent?: any;
  onCountrySelect?: Function;
  ref: MutableRefObject<HTMLInputElement> | null | RefObject<HTMLInputElement> | undefined;
  defaultValue?: any;
}

export const InputSkeleton: FC<ISkeletonProps> = memo(
  forwardRef(
    (
      {
        status = 'default',
        width = DEFAULT_WIDTH,
        disabled,
        focused,
        setFocused,
        size = 'big',
        onChange,
        icon,
        type,
        iconServices,
        onFocus,
        value: rawValue,
        placeholder,
        onBlur,
        onKeyDown,
        onClick,
        inputName,
        activeInformer,
        maxLength,
        id,
        suffix,
        iconIsActive,
        mask,
        setIconIsActive,
        number,
        range,
        withCoins,
        phoneCountry,
        countryIcon: CountryIcon,
        selectIcon: SelectIcon,
        onCountrySelectOpen,
        countrySelectComponent: CountrySelectComponent,
        onCountrySelect,
        defaultValue,
      },
      ref: any
    ) => {
      const hasFraction = number && rawValue && rawValue.includes('.');
      const [integer, fraction] = hasFraction ? rawValue.split('.') : [rawValue, '00'];

      const [integerWidth, refNode, overflowed] = useSuffixHook(
        formatValueWithSeparator(integer),
        Boolean(suffix) || withCoins,
        size,
        ref
      );
      const [coins, setCoins] = useState(fraction);
      const coinsRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

      const focusCoinsInput = () => {
        coinsRef?.current && coinsRef.current.focus();
      };

      const SuffixLabel = size === 'micro' ? Body2Short : Body1Short;

      const handleMemomizeChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;

        !range && setFocused(true);
        !number
          ? onChange && onChange(event, value)
          : onChange &&
            onChange(
              event,
              withCoins ? joinIntegerWithFraction(formatValue(value), coins) : formatValue(value)
            );
      };

      const handleFocus = (event: FocusEvent<HTMLInputElement>): void => {
        setFocused(true);
        onFocus && onFocus(event);
      };

      const setIntegerInputFocused = (event: any) => {
        event.preventDefault() && event.stopPropagation();
        event.currentTarget.parentNode.children[0].focus();
      };

      const handleBlur = (event: FocusEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setFocused(false);

        onBlur && onBlur(event, value);
      };

      const handleKeyDown = (event: any): void => {
        const selection = event.target.selectionStart;
        if (event.keyCode === KEY_CODES.RIGHT && selection === event.target.value.length) {
          focusCoinsInput();
          return;
        }

        onKeyDown && onKeyDown(event);
        const { value } = event.target;

        if (!disabled && event.keyCode === KEY_CODES.ENTER) {
          onChange && onChange(event, value);
          event.target.blur();
        }
      };

      const handleMouseLeave = () => {
        iconIsActive && setIconIsActive && setIconIsActive(false);
      };

      const onCoinsChange = (event: any) => {
        setCoins(event.target.value);
        const newRawValue = integer ? `${integer}.${event.target.value || '00'}` : '';
        onChange && onChange(event, newRawValue);
      };

      const countrySelectHandler = (option) => {
        onCountrySelect && onCountrySelect(option);
        if (ref.current) {
          ref.current.focus();
          setFocused(true);
        }
      };

      const [selectMenuOpen, setSelectMenuOpen] = useState<boolean>(false);

      const shouldRenderCoins = number && withCoins && rawValue && !defaultValue;
      const shouldRenderBasicInput = (!mask || number) && !CountrySelectComponent && onChange;
      const shouldRenderUserIcon = icon && status !== 'error';
      const shouldRenderSuffix = suffix && Boolean(rawValue.length) && !overflowed;
      const shouldRenderIconWrapper = icon || iconServices;
      const shouldRenderUncontrollInput = defaultValue && !onChange;

      return (
        <InputWrapper
          onMouseLeave={handleMouseLeave}
          focused={focused}
          disabled={disabled}
          status={status}
          size={size}
          range={range}
        >
          {shouldRenderUncontrollInput && (
            <InputComponent
              id={id}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={focused}
              name={inputName}
              ref={number ? refNode : ref}
              $size={size}
              disabled={disabled}
              defaultValue={defaultValue}
              placeholder={placeholder}
              onFocus={handleFocus}
              onBlur={handleBlur}
              focused={focused}
              type={type}
              autoComplete="off"
              maxLength={maxLength}
            />
          )}
          {CountrySelectComponent && (
            <>
              <CountryPhoneInputBox>
                <CountrySelectWrapper
                  size={size}
                  onClick={(e) => {
                    e.preventDefault();
                    const open = selectMenuOpen;
                    setSelectMenuOpen(!open);
                    setFocused(!open);
                  }}
                >
                  <CountrySelectComponent
                    onCountrySelect={countrySelectHandler}
                    disabled={disabled}
                    focused={focused}
                    size={size}
                    onMenuOpen={() => setFocused(true)}
                    onMenuClose={() => setFocused(false)}
                    menuWidth={width}
                    menuIsOpen={selectMenuOpen}
                  />
                </CountrySelectWrapper>
                <InputComponent
                  value={rawValue}
                  $size={size}
                  focused={focused}
                  disabled={disabled}
                  id={id}
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus={focused}
                  name={inputName}
                  ref={ref}
                  onChange={handleMemomizeChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  type={type}
                  autoComplete="off"
                  onClick={onClick}
                  maxLength={maxLength}
                  withSelectComponent
                />
              </CountryPhoneInputBox>
            </>
          )}
          {shouldRenderBasicInput && (
            <InputComponent
              id={id}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={focused}
              name={inputName}
              ref={number ? refNode : ref}
              $size={size}
              disabled={disabled}
              placeholder={placeholder}
              value={number ? formatValueWithSeparator(integer) : rawValue}
              onChange={handleMemomizeChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              focused={focused}
              type={type}
              autoComplete="off"
              onClick={onClick}
              maxLength={maxLength}
            />
          )}
          {shouldRenderCoins && (
            <SeparatorDot position={integerWidth} disabled={disabled} size={size}>
              {'.'}
            </SeparatorDot>
          )}
          {shouldRenderCoins && (
            <EditableCoinsWrapper
              ref={coinsRef}
              html={coins}
              setFocusedStyle={setFocused}
              setIntegerFocused={(event) => {
                setFocused(true);
                setIntegerInputFocused(event);
              }}
              position={integerWidth}
              onChange={onCoinsChange}
              disabled={disabled}
              dimension={size}
            />
          )}
          {shouldRenderSuffix && (
            <Suffix
              onMouseDown={setIntegerInputFocused}
              size={size}
              disabled={disabled}
              position={integerWidth}
              withCoins={shouldRenderCoins}
            >
              <SuffixLabel>{suffix}</SuffixLabel>
            </Suffix>
          )}
          {shouldRenderIconWrapper && (
            <IconWrapper onMouseDown={(e) => e.preventDefault()}>
              {shouldRenderUserIcon && <UserIcon disabled={disabled}>{icon}</UserIcon>}
              {iconServices}
            </IconWrapper>
          )}
        </InputWrapper>
      );
    }
  )
);

InputSkeleton.displayName = 'InputSkeleton';
