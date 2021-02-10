import React, { FC, useState, useRef } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import { ReactComponent as ChevronDownOutline } from '../Icons/system/ChevronDownOutline.svg';
import { ReactComponent as ChevronUpOutline } from '../Icons/system/ChevronUpOutline.svg';
import { KEY_CODES } from '../common';
import type { IButtonProps } from '../Button';
import type { IOverflowMenuProps, IOverflowMenuItem } from '../OverflowMenu';

import { MainButton } from './MainButton';
import { DropdownButton } from './DropdownButton';
import { StyledOverflowMenu } from './StyledOverflowMenu';
import { Wrapper } from './Wrapper';
import { ButtonsWrapper } from './ButtonsWrapper';
import type { Kind } from './ButtonsWrapper';
import { Separator } from './Separator';

const ICON_SIZE = 24;
const ICON_SIZE_SMALL = 20;

export interface IMultiButtonProps {
  /** Значение кнопки */
  button: IOverflowMenuItem;
  /** Массив опций для меню */
  list: IOverflowMenuProps['list'];
  /** Коллбэк на изменение выбранной опции (кнопки или пункта меню). Срабатывает при клике на опцию или при нажатии Enter/Space при фокусе на опции */
  onChange?: IOverflowMenuProps['onChange'];
  /** Внешний вид кнопки */
  kind?: Kind;
  /** Размер кнопки */
  size?: IButtonProps['size'];
  /** Отключение кнопки */
  disabled?: boolean;
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
}

export const MultiButton: FC<IMultiButtonProps> = ({
  className,
  dataTestId,
  disabled,
  kind = 'primary',
  size = 'big',
  button,
  list,
  onChange,
}) => {
  const overflowMenuRef: any = useRef(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const [value, setValue] = useState<IOverflowMenuItem>(button);

  const handleDropdownClick = () => {
    setMenuOpened(!menuOpened);
    overflowMenuRef.current?.select.focus();
  };
  const handleChange: IOverflowMenuProps['onChange'] = (value) => {
    setMenuOpened(false);
    setValue(value);
    onChange?.(value);
  };
  const handleOutsideClick = () => {
    setMenuOpened(false);
  };
  const handleKeyDown = (event: any) => {
    const { target } = event;
    let newFocusTarget;

    switch (event.keyCode) {
      case KEY_CODES.LEFT:
      case KEY_CODES.RIGHT:
        newFocusTarget =
          target !== target.parentNode.lastChild
            ? target.parentNode.lastChild
            : target.parentNode.firstChild;
        event.preventDefault();
        break;
      case KEY_CODES.ESCAPE:
        if (menuOpened) setMenuOpened(false);
        break;
      default:
        break;
    }

    if (newFocusTarget) {
      newFocusTarget.focus();
    }
  };

  const iconSize = size === 'big' || size === 'medium' ? ICON_SIZE : ICON_SIZE_SMALL;
  const Icon = menuOpened ? ChevronUpOutline : ChevronDownOutline;

  return (
    <OutsideClickHandler onOutsideClick={handleOutsideClick}>
      <Wrapper
        ref={wrapperRef}
        className={className}
        data-test-id={dataTestId}
        disabled={disabled}
        onKeyDown={handleKeyDown}
      >
        <ButtonsWrapper disabled={disabled} kind={kind}>
          <MainButton
            disabled={disabled}
            kind={kind}
            size={size}
            onClick={() => handleChange(button)}
          >
            {button.label}
          </MainButton>
          <Separator size={size} />
          <DropdownButton disabled={disabled} kind={kind} size={size} onClick={handleDropdownClick}>
            <Icon height={iconSize} width={iconSize} />
          </DropdownButton>
        </ButtonsWrapper>
        <StyledOverflowMenu
          disabled={disabled}
          hideDropdownIndicator
          innerRef={overflowMenuRef}
          list={list}
          menu={{
            opened: menuOpened,
            alignment: 'right',
          }}
          value={value}
          onChange={handleChange}
        />
      </Wrapper>
    </OutsideClickHandler>
  );
};
