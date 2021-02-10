import { MouseEvent, SyntheticEvent } from 'react';

import { CalendarSize, LocaleType } from './constants';
import { IDateValidator } from './Validator';

export interface IDateBaseProps {
  /** Выбранное значение даты */
  selected?: Date | null;
  /** Начальная дата диапазона */
  startDate?: Date | null;
  /** Конечная дата диапазона */
  endDate?: Date | null;
  /** Режим выбора диапазона дат */
  range?: boolean;
  /** Локаль отображения дат */
  localeName: LocaleType;
  /** Предоставляет функции проверки корректности даты, возможности её выбора в календаре.
   *  Если возвращаемое значение не 'null', то дата считается некорректной, а возвращаемое
   *  функцией значение является текстом ошибки и выводится в DatePicker
   */
  validator?: IDateValidator;
}

export interface IDateSelectionProps extends IDateBaseProps {
  /** Коллбэк выбора даты, срабатывает при клике на дне или годе (в режиме диапазона date - это массив из двух дат) */
  onChange(date: Date | Array<Date | null> | null, event?: SyntheticEvent<any>): void;
  /** Минимально возможная для выбора дата */
  minDate?: Date;
  /** Максимально возможная для выбора дата */
  maxDate?: Date;
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
}

export interface ICalendarProps extends IDateSelectionProps {
  /** Размер календаря */
  size?: CalendarSize;
  /** Отключение верхнего заголовка с датой и днем недели, прежде всего для DatePicker */
  simple?: boolean;
  /** Контейнер, в котором при необходимости можно отрисовать тултип через ReactDOM.createPortal */
  tooltipContainer?: Element | null;
}

export interface IDateCalendarBaseProps extends IDateBaseProps {
  size: CalendarSize;
  activeDate?: Date | null;
  onClick: (date: Date, event: MouseEvent<HTMLDivElement>) => void;
}

export interface IDayCalendarProps extends IDateCalendarBaseProps {
  day: Date;
  month: number;
  onMouseEnter: (date: Date, event: MouseEvent<HTMLDivElement>) => void;
}

export type IWeekCalendarProps = IDayCalendarProps;

export interface IMonthCalendarProps extends IDateCalendarBaseProps {
  day: Date;
  onMouseEnter: (date: Date, event: MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
}

export interface IYearsCalendarProps extends IDateCalendarBaseProps {
  viewDate: Date;
}
