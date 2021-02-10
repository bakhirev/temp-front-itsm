import React, { createRef, ElementType, FC, KeyboardEvent, MouseEvent } from 'react';

import { Badge } from '../Badge';
import { Button1, Button2 } from '../Typography';
import { OverflowMenu } from '../OverflowMenu';
import { KEY_CODES } from '../common';

import { AdditionalContentLayout } from './AdditionalContentLayout';
import { Button } from './Button';
import { ButtonGroupComponent } from './ButtonGroupComponent';
import { OverflowMenuWrapper } from './OverflowMenuWrapper';
import type { Kind } from './Button';
import type { Size } from './ButtonGroupComponent';

const ICON_SIZE = 24;
const ICON_SIZE_SMALL = 20;

export interface IButtonGroupProps {
  /** Идентификатор активной кнопки */
  activeButtonId: number | string;
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
  /** Внешний вид компонента */
  kind?: Kind;
  /** Список кнопок */
  list: Array<IButtonGroupItem>;
  /** Размер компонента */
  size?: Size;
  /** Коллбэк на переключение кнопки */
  onChange: (id: number | string) => void;
}

export interface IButtonGroupItem {
  badgeValue?: number;
  disabled?: boolean;
  hidden?: boolean;
  icon?: ElementType;
  id: number | string;
  label: string;
}

export const ButtonGroup: FC<IButtonGroupProps> = ({
  activeButtonId,
  className,
  dataTestId,
  kind = 'solid',
  list,
  size = 'medium',
  onChange,
}) => {
  const overflowMenuRef = createRef<any>();

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => event.preventDefault();
  const handleOverflowMenuChange = ({ value }: any) => onChange(value);
  const handleOverflowMenuWrapperFocus = () => overflowMenuRef.current?.focus();

  const Label = size === 'medium' ? Button1 : Button2;

  const hiddenItems = list
    .filter(({ hidden }) => hidden)
    .map(({ disabled, id, label }) => ({
      isDisabled: disabled,
      isSelected: activeButtonId === id,
      label,
      value: id,
    }));

  const [activeButton] = list.filter(({ id }) => id === activeButtonId);

  return (
    <ButtonGroupComponent className={className} data-test-id={dataTestId} kind={kind} size={size}>
      {list.map(({ badgeValue, disabled = false, hidden = false, icon: Icon, id, label }) => {
        if (hidden) return null;

        const handleClick = () => {
          !disabled && onChange(id);
        };
        const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
          if (event.keyCode === KEY_CODES.ENTER || event.keyCode === KEY_CODES.SPACEBAR) {
            event.preventDefault();
            !disabled && onChange(id);
          }
        };

        const getBadgeKind = () => {
          if (activeButtonId === id) {
            return 'neutral-light';
          }

          if (disabled) {
            return kind === 'solid' ? 'neutral-white-disabled' : 'neutral-light-disabled';
          }

          return kind === 'solid' ? 'neutral-white-inactive' : 'neutral-light-inactive';
        };

        const iconSize = size === 'medium' ? ICON_SIZE : ICON_SIZE_SMALL;
        return (
          <Button
            active={activeButtonId === id}
            disabled={disabled}
            key={id}
            kind={kind}
            size={size}
            tabIndex={disabled ? -1 : 1}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onMouseDown={handleMouseDown}
          >
            {Icon && (
              <AdditionalContentLayout left>
                <Icon height={iconSize} width={iconSize} />
              </AdditionalContentLayout>
            )}
            <Label>{label}</Label>
            {badgeValue && (
              <AdditionalContentLayout right>
                <Badge
                  kind={getBadgeKind()}
                  size={size === 'medium' ? 'big' : 'small'}
                  value={badgeValue}
                />
              </AdditionalContentLayout>
            )}
          </Button>
        );
      })}

      {Boolean(hiddenItems.length) && (
        <OverflowMenuWrapper size={size} tabIndex={1} onFocus={handleOverflowMenuWrapperFocus}>
          <OverflowMenu
            innerRef={overflowMenuRef}
            list={hiddenItems}
            menu={{
              alignment: 'right',
              marginTop: 20,
            }}
            size={size === 'micro' ? 'medium' : 'big'}
            onChange={handleOverflowMenuChange}
            value={{
              value: activeButton.id,
              label: activeButton.label,
            }}
          />
        </OverflowMenuWrapper>
      )}
    </ButtonGroupComponent>
  );
};
