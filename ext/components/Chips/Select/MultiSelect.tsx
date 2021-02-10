import React, { FC, Fragment, useState } from 'react';

import { useTooltip } from '../../common/hooks';
import { createTooltipHOC } from '../../TooltipHOC';
import { KEY_CODES } from '../../common';
import { ICON_SIZE_BIG, ICON_SIZE_SMALL } from '../common/constants';
import { ChipsWrapper } from '../common/ChipsWrapper';
import { Separator } from '../common/Separator';
import type { Size } from '../common/common';
import { StyledCaption11 } from '../common/Caption11';
import { Caption13 } from '../common/Caption13';

import { IItemChipSelect } from './types';
import { ChipSelectItem } from './ChipSelectItem';
import { IconContainer } from './IconContainer';
import { SelectLabelContainer } from './SelectLabelContainer';

export interface IChipsMultiSelectProps {
  /** Массив чипсов */
  items: IItemChipSelect[];
  /** Размер чипсов */
  size?: Size;
  /** Массив идентификаторов выбранных элементов */
  selectedIds?: string[];
  /** Обработчик выбора элемента */
  onSelectItem?: (id: string) => void;
  /** Обработчик фокусировки на элементе */
  onFocusItem?: (id: string) => void;
  /** В селекте или нет, влияет на размер отступа */
  inSelect?: boolean;
  /** Отключение чипсов */
  disabled?: boolean;
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
  /** Ширина Тега */
  width?: number | string;
  /** Контейнер, в котором при необходимости можно отрисовать тултип через ReactDOM.createPortal */
  tooltipContainer?: Element | null;
}

export const MultiSelect: FC<IChipsMultiSelectProps> = ({
  items,
  inSelect,
  className,
  dataTestId,
  size = 'big',
  selectedIds = [],
  onSelectItem,
  onFocusItem,
  width,
  tooltipContainer,
}) => {
  const [tooltipItems, itemsRef] = useTooltip();
  const [selectedIdsState, setSelectedIdsState] = useState(selectedIds);
  const [focusedItem, setFocusedItem] = useState(null);

  const handleItemSelect = (itemId) => {
    if (selectedIdsState.includes(itemId)) {
      setSelectedIdsState(selectedIdsState.filter((id) => id !== itemId));
    } else {
      setSelectedIdsState([...selectedIdsState, itemId]);
    }
    onSelectItem && onSelectItem(itemId);
  };

  const handleFocus = (itemId) => {
    setFocusedItem(itemId);
    onFocusItem && onFocusItem(itemId);
  };

  const onKeyDownCreator = (itemId) => (event) => {
    if ([KEY_CODES.SPACEBAR, KEY_CODES.ENTER].includes(event.keyCode)) {
      event.preventDefault();
      handleItemSelect(itemId);
    }
  };

  return (
    <ChipsWrapper className={className} data-test-id={dataTestId}>
      {items.map((chipItem, index) => {
        const Chip = tooltipItems[chipItem.id] ? createTooltipHOC(ChipSelectItem) : ChipSelectItem;
        const Label = size === 'small' ? StyledCaption11 : Caption13;
        const iconSize = size === 'big' ? ICON_SIZE_BIG : ICON_SIZE_SMALL;
        const Icon = chipItem.icon;
        const selected = selectedIdsState.includes(chipItem.id);

        return (
          <Fragment key={chipItem.id}>
            <Chip
              tooltip={chipItem.label}
              container={tooltipContainer}
              size={size}
              disabled={chipItem.disabled}
              onClick={chipItem.disabled ? undefined : () => handleItemSelect(chipItem.id)}
              selected={selected}
              onFocus={chipItem.disabled ? undefined : () => handleFocus(chipItem.id)}
              focused={focusedItem === chipItem.id}
              onKeyDown={chipItem.disabled ? undefined : onKeyDownCreator(chipItem.id)}
              tabIndex={chipItem.disabled ? -1 : 1}
            >
              {Icon && (
                <IconContainer disabled={chipItem.disabled} selected={selected}>
                  <Icon width={iconSize} height={iconSize} />
                </IconContainer>
              )}
              <SelectLabelContainer size={size} width={width} withIcon={!!Icon}>
                <Label ref={(el) => itemsRef(el, chipItem.id)}>{chipItem.label}</Label>
              </SelectLabelContainer>
            </Chip>
            {index !== items.length - 1 && <Separator inSelect={inSelect} />}
          </Fragment>
        );
      })}
    </ChipsWrapper>
  );
};
