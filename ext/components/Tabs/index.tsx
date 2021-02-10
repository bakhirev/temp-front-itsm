import React, { FC, createRef, KeyboardEvent, useEffect, useState, RefObject } from 'react';

import { KEY_CODES } from '../common';
import { Badge } from '../Badge';
import { OverflowMenu } from '../OverflowMenu';

import { Content } from './Content';
import { Underline } from './Underline';
import { Tab } from './Tab';
import { Wrapper, TabsWrapper, BadgeWrapper, IconWrapper, MenuWrapper } from './Wrapper';
import type { ITabsProps, ITab } from './interfaces';

export type { ITabsProps, ITab } from './interfaces';

export const Tabs: FC<ITabsProps> = ({
  list,
  onChange,
  width,
  size = 'big',
  underline = true,
  overflowMenu,
  className,
  dataTestId,
  mobile = false,
}) => {
  const actualSize = mobile ? 'small' : size;

  const tabsRefs: RefObject<HTMLDivElement>[] = [];
  const tabsWrapperRef = createRef<HTMLDivElement>();
  const menuRef = createRef<any>();
  const [underlineRect, setUnderlineRect] = useState<{
    width: number;
    left: number;
  }>({
    width: 0,
    left: 0,
  });
  const [menuValue, setMenuValue] = useState<{ value: any; label: string }>();
  const { left, width: underlineWidth } = underlineRect;
  const TabContent = Content(actualSize);

  useEffect(() => {
    const activeTab = list.findIndex((tab: ITab) => tab.active);
    const activeRef = activeTab > -1 && tabsRefs[activeTab].current;

    if (activeRef && (activeRef.offsetLeft !== left || activeRef.clientWidth !== underlineWidth)) {
      setUnderlineRect({
        left: activeRef.offsetLeft,
        width: activeRef.clientWidth,
      });
    }
  }, [list, left, underlineWidth, tabsRefs]);

  const handleTabClick = ({ label, value, disabled }: ITab) => {
    if (!disabled) {
      onChange && onChange({ value, label, active: true });
      setMenuValue({ value: '', label: '' });
    }
  };

  const handleTabKeyUp = (event: KeyboardEvent, { label, value, disabled }: ITab) => {
    if (!disabled && (event.keyCode === KEY_CODES.ENTER || event.keyCode === KEY_CODES.SPACEBAR)) {
      onChange && onChange({ value, label, active: true });
      setMenuValue({ value: '', label: '' });
    }
  };

  const handleTabKeyDown = (event: any) => {
    const { target } = event;
    let newFocusTarget;

    switch (event.keyCode) {
      case KEY_CODES.LEFT:
        newFocusTarget =
          target.previousElementSibling ||
          (!overflowMenu?.disabled && menuRef.current?.select) ||
          tabsWrapperRef.current?.lastChild;
        break;
      case KEY_CODES.RIGHT:
        newFocusTarget =
          target.nextElementSibling ||
          (!overflowMenu?.disabled && menuRef.current?.select) ||
          tabsWrapperRef.current?.firstChild;
        break;
      default:
        break;
    }

    if (newFocusTarget) {
      newFocusTarget.focus();
    }
    event.preventDefault();
  };

  const handleMenuChange = (value: any) => {
    onChange && onChange({ ...value, active: true });
    setUnderlineRect({
      left: 0,
      width: 0,
    });
    setMenuValue(value);
  };

  const handleMenuKeyDown = (event: any) => {
    let newFocusTarget;
    switch (event.keyCode) {
      case KEY_CODES.LEFT:
        newFocusTarget = tabsWrapperRef.current?.lastChild;
        break;
      case KEY_CODES.RIGHT:
        newFocusTarget = tabsWrapperRef.current?.firstChild;
        break;
      default:
        break;
    }

    if (newFocusTarget) {
      (newFocusTarget as HTMLElement).focus();
    }
    event.preventDefault();
  };

  const iconSize = actualSize === 'small' ? 20 : 24;

  return (
    <Wrapper
      className={className}
      data-test-id={dataTestId}
      mobile={mobile}
      underline={underline}
      width={width}
    >
      <Underline left={left} width={underlineWidth} />
      <TabsWrapper ref={tabsWrapperRef} onKeyDown={handleTabKeyDown} size={actualSize}>
        {list.map((item: ITab, index: number) => {
          const { active, disabled, label, value, icon: Icon, badge } = item;
          const ref = createRef<HTMLDivElement>();
          tabsRefs[index] = ref;
          return (
            <Tab
              tabIndex={0}
              ref={ref}
              onClick={() => handleTabClick(item)}
              onKeyUp={(event: KeyboardEvent) => handleTabKeyUp(event, item)}
              key={value}
              active={active}
              disabled={disabled}
              size={actualSize}
            >
              {Icon && (
                <IconWrapper>
                  <Icon width={iconSize} height={iconSize} />
                </IconWrapper>
              )}
              <TabContent icon={!!Icon} badge={typeof badge !== 'undefined'}>
                {label}
              </TabContent>
              {typeof badge !== 'undefined' && (
                <BadgeWrapper>
                  <Badge
                    value={badge}
                    size={actualSize}
                    kind={
                      active
                        ? 'info'
                        : disabled
                        ? 'neutral-light-disabled'
                        : 'neutral-light-inactive'
                    }
                  />
                </BadgeWrapper>
              )}
            </Tab>
          );
        })}
      </TabsWrapper>
      {overflowMenu && (
        <MenuWrapper onKeyDown={handleMenuKeyDown} size={actualSize}>
          <OverflowMenu
            value={menuValue}
            innerRef={menuRef}
            list={overflowMenu.list.map((item: ITab) => ({
              value: item.value,
              label: item.label,
              isSelected: item.active,
              isDisabled: item.disabled,
            }))}
            onChange={handleMenuChange}
            menu={{
              alignment: 'right',
            }}
            disabled={overflowMenu.disabled}
          />
        </MenuWrapper>
      )}
    </Wrapper>
  );
};
