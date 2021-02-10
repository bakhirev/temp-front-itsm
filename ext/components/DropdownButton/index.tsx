import React, { useEffect, useRef, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import type { FC } from 'react';

import { ReactComponent as ChevronDownOutline } from '../Icons/system/ChevronDownOutline.svg';
import { ReactComponent as ChevronUpOutline } from '../Icons/system/ChevronUpOutline.svg';
import { Button } from '../Button';
import { KEY_CODES } from '../common';
import type { IButtonProps } from '../Button';
import type { IOverflowMenuProps } from '../OverflowMenu';

import { Wrapper } from './Wrapper';
import { StyledOverflowMenu } from './StyledOverflowMenu';

const ICON_SIZE = 24;
const ICON_SIZE_SMALL = 20;

type Kind = 'primary' | 'secondary' | 'ghost' | 'white';

export interface IDropdownButtonProps {
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
  /** Дефолтное значение меню */
  defaultValue?: IOverflowMenuProps['defaultValue'];
  /** Отключение кнопки */
  disabled?: IButtonProps['disabled'];
  /** Внешний вид кнопки */
  kind?: Kind;
  /** Массив опций */
  list: IOverflowMenuProps['list'];
  /** Размер кнопки */
  size?: IButtonProps['size'];
  /** Значение меню */
  value?: IOverflowMenuProps['value'];
  /** Коллбэк на изменение значения меню. Срабатывает при клике на опцию или нажатии Enter/Space при фокусе на опции */
  onChange?: IOverflowMenuProps['onChange'];
}

export const DropdownButton: FC<IDropdownButtonProps> = ({
  children,
  className,
  dataTestId,
  defaultValue,
  disabled,
  kind,
  list,
  size = 'medium',
  value,
  onChange,
}) => {
  const overflowMenuRef: any = useRef(null);

  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  const handleOutsideClick = () => setMenuOpened(false);
  const handleChange: IOverflowMenuProps['onChange'] = (value) => {
    setMenuOpened(false);
    onChange?.(value);
  };

  const handleMenuOpen = () => {
    setMenuOpened(!menuOpened);
    overflowMenuRef.current?.select.focus();
  };

  const handleEscKeyDown = (event: KeyboardEvent) => {
    if (menuOpened && event.keyCode === KEY_CODES.ESCAPE) {
      setMenuOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscKeyDown);
    return () => {
      document.removeEventListener('keydown', handleEscKeyDown);
    };
  });

  const iconSize = size === 'big' || size === 'medium' ? ICON_SIZE : ICON_SIZE_SMALL;
  const Icon = menuOpened ? ChevronUpOutline : ChevronDownOutline;

  return (
    <OutsideClickHandler onOutsideClick={handleOutsideClick}>
      <Wrapper className={className} data-test-id={dataTestId}>
        <Button disabled={disabled} kind={kind} size={size} onClick={handleMenuOpen}>
          {children}
          <Icon height={iconSize} width={iconSize} />
        </Button>
        <StyledOverflowMenu
          defaultValue={defaultValue}
          innerRef={overflowMenuRef}
          list={list}
          menu={{
            opened: menuOpened,
          }}
          hideDropdownIndicator
          value={value}
          onChange={handleChange}
        />
      </Wrapper>
    </OutsideClickHandler>
  );
};
