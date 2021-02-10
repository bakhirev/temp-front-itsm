import React, { FC, MouseEvent, useEffect, useRef, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import { ReactComponent as ChevronDownOutline } from '../../Icons/system/ChevronDownOutline.svg';
import { ReactComponent as ChevronUpOutline } from '../../Icons/system/ChevronUpOutline.svg';
import { Body2Long } from '../../Typography';
import { KEY_CODES } from '../../common';
import { ICON_SIZE } from '../constants';

import { DropdownComponent } from './DropdownComponent';
import { IconLayout } from './IconLayout';
import { Item } from './Item';
import { List } from './List';
import { calculateListDirection } from './calculateListDirection';
import type { Direction } from './List';

interface IDropdownProps {
  disabled: boolean;
  list: Array<number>;
  value: number;
  onChange?: (newPage: number) => void;
}

export const Dropdown: FC<IDropdownProps> = ({ disabled, list, value, onChange }) => {
  const dropdownRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const [opened, setOpened] = useState<boolean>(false);
  const [focusedItem, setFocusedItem] = useState<number>(list[0]);
  const [listDirection, setListDirection] = useState<Direction>('bottom');

  const openList = () => {
    setOpened(true);
    setListDirection(calculateListDirection({ dropdownRef, listRef }));
  };

  const handleFocusPrevent = (event: MouseEvent<HTMLButtonElement>) => event.preventDefault();
  const handleListOpen = () => {
    if (!opened) {
      setFocusedItem(list[0]);
      openList();
    } else {
      setOpened(false);
    }
  };
  const handleOutsideClick = () => setOpened(false);
  const handleEscKeyDown = ({ keyCode }: KeyboardEvent) => {
    opened && keyCode === KEY_CODES.ESCAPE && setOpened(false);
  };
  const handleItemSelect = (item: number) => onChange?.(item);

  const handleItemMouseEnter = (item: number) => setFocusedItem(item);

  const handleArrowDownKeyDown = (event: KeyboardEvent) => {
    if (opened && event.keyCode === KEY_CODES.DOWN) {
      event.preventDefault();
      const focusedItemIdx = list.indexOf(focusedItem);
      const nextFocusedItemIdx = focusedItemIdx + 1;
      if (nextFocusedItemIdx !== list.length) {
        setFocusedItem(list[nextFocusedItemIdx]);
      }
    }
  };

  const handleArrowUpKeyDown = (event: KeyboardEvent) => {
    if (opened && event.keyCode === KEY_CODES.UP) {
      event.preventDefault();
      const focusedItemIdx = list.indexOf(focusedItem);
      const nextFocusedItemIdx = focusedItemIdx - 1;
      if (nextFocusedItemIdx >= 0) {
        setFocusedItem(list[nextFocusedItemIdx]);
      }
    }
  };

  const handleEnterKeyDown = (event: KeyboardEvent) => {
    if (opened && event.keyCode === KEY_CODES.ENTER) {
      onChange?.(focusedItem);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscKeyDown);
    document.addEventListener('keydown', handleArrowDownKeyDown);
    document.addEventListener('keydown', handleArrowUpKeyDown);
    document.addEventListener('keydown', handleEnterKeyDown);
    return () => {
      document.removeEventListener('keydown', handleEscKeyDown);
      document.removeEventListener('keydown', handleArrowDownKeyDown);
      document.removeEventListener('keydown', handleArrowUpKeyDown);
      document.removeEventListener('keydown', handleEnterKeyDown);
    };
  });

  const Icon = opened ? ChevronUpOutline : ChevronDownOutline;

  return (
    <OutsideClickHandler onOutsideClick={handleOutsideClick}>
      <DropdownComponent
        disabled={disabled}
        opened={opened}
        ref={dropdownRef}
        onClick={handleListOpen}
        onMouseDown={handleFocusPrevent}
      >
        <Body2Long>{value}</Body2Long>
        <IconLayout>
          <Icon width={ICON_SIZE} height={ICON_SIZE} />
        </IconLayout>
        <List $direction={listDirection} $opened={opened} ref={listRef}>
          {list.map((item, idx) => (
            <Item
              focused={focusedItem === item}
              key={idx}
              selected={value === item}
              onClick={() => handleItemSelect(item)}
              onMouseEnter={() => handleItemMouseEnter(item)}
            >
              <Body2Long>{item}</Body2Long>
            </Item>
          ))}
        </List>
      </DropdownComponent>
    </OutsideClickHandler>
  );
};
