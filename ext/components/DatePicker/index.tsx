import React, { Component, createRef, RefObject, FocusEvent, SyntheticEvent } from 'react';
import ReactDOM from 'react-dom';

import type { IDateSelectionProps, ICalendarProps } from '../Calendar';
import type { IInputMaskProps } from '../Inputs';
import { Calendar } from '../Calendar';
import { Input } from '../Inputs';
import { getDefaultDateValidator } from '../Calendar/Validator';
import { getFormattedValue, getParsedValue, valid } from '../Calendar/date-utils';
import { equalDates, getScrollableParents, getContainingBlockOffset } from '../common/utils';
import { getIconSize } from '../Inputs/common';
import { ReactComponent as CalendarSolid } from '../Icons/system/CalendarSolid.svg';

import { CALENDAR_SIZES, DEFAULT_DATE_FORMAT } from './constants';
import { DatePickerComponent } from './DatePickerComponent';
import { DatePickerInputComponent } from './DatePickerInputComponent';
import { CalendarPopupComponent } from './CalendarPopupComponent';
import { StyledCalendarSolidIcon } from './StyledCalendarSolidIcon';

type CalendarSize = ICalendarProps['size'];

type IDatePickerInputMaskProps = Omit<IInputMaskProps, 'value'>;

export interface IDatePickerProps extends IDateSelectionProps, IDatePickerInputMaskProps {
  /** Коллбэк выбора даты, срабатывает при клике на дне или годе (в режиме диапазона date - это массив из двух дат) */
  onChange(date: Date | Array<Date | null> | null): void;
  /** Ширина инпута (по умолчанию используется ширина календаря) */
  width?: string | number;
  /** Размер календаря */
  calendarSize?: CalendarSize;
  /** Коллбэк обработки открытия календаря */
  onShow?: () => void;
  /** Коллбэк обработки закрытия календаря */
  onHide?: () => void;
  /** Коллбэк обработки выбора даты */
  onDateSelected?: () => void;
  /** Контейнер, в котором происходит размещение выпадающего календаря */
  calendarContainer?: Element;
}

interface IState {
  valueDate: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  inputValue: any;
  visible?: boolean;
  focused?: boolean;
  error?: string | null;
  posX: number;
  posY: number;
}

export class DatePicker extends Component<IDatePickerProps, IState> {
  static defaultProps: Partial<IDatePickerProps> = {
    placeholder: '',
  };

  static getDerivedStateFromProps(nextProps: IDatePickerProps, prevState: IState) {
    const { range, selected, startDate, endDate } = nextProps;
    if (
      (!range && selected && !equalDates(selected, prevState.valueDate)) ||
      (range &&
        ((startDate && !equalDates(startDate, prevState.startDate)) ||
          (endDate && !equalDates(endDate, prevState.endDate))))
    ) {
      const inputValue = range ? (startDate ? [startDate, endDate] : null) : selected;
      return {
        inputValue,
        valueDate: selected === undefined ? prevState.valueDate : selected,
        startDate: startDate === undefined ? prevState.startDate : startDate,
        endDate: startDate ? (endDate === undefined ? prevState.endDate : endDate) : null,
      };
    }
    return null;
  }

  refInput: RefObject<HTMLInputElement> = createRef();
  refDatePicker: RefObject<HTMLDivElement> = createRef();
  refCalendar: RefObject<any> = createRef();
  scrollableParents?: Array<Element> = undefined;

  state: IState = {
    visible: false,
    focused: false,
    valueDate: null,
    startDate: null,
    endDate: null,
    inputValue: null,
    error: null,
    posX: 0,
    posY: 0,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.onHide);
    window.addEventListener('resize', this.onHide);
    this.changePosition();
  }
  componentWillUnmount() {
    this.scrollableParents &&
      this.scrollableParents.forEach((el) => el.removeEventListener('scroll', this.onHide));
    window.removeEventListener('scroll', this.onHide);
    window.removeEventListener('resize', this.onHide);
  }
  componentDidUpdate(_: IDatePickerProps, prevState: IState) {
    if (!this.scrollableParents && this.refDatePicker.current) {
      this.scrollableParents = getScrollableParents(this.refDatePicker.current);
      this.scrollableParents?.forEach((el) => el.addEventListener('scroll', this.onHide));
    }
    if (prevState.visible === this.state.visible) return;
    this.changePosition();
  }

  changePosition = () => {
    if (!this.state.visible) return;
    const calendarNode = this.refCalendar.current;
    const targetNode = this.refInput.current;
    if (!calendarNode || !targetNode) return;

    const targetRect = targetNode.getBoundingClientRect();
    const { parentTop, parentLeft } = getContainingBlockOffset(calendarNode);
    this.setState({
      posX: targetRect.left - parentLeft,
      posY: targetRect.height + targetRect.top - parentTop,
    });
  };

  getValidator() {
    return this.props.validator || getDefaultDateValidator(this.props.minDate, this.props.maxDate);
  }

  handleToggleVisible = (e: React.MouseEvent<HTMLDivElement>) => {
    const { visible } = this.state;
    this.refInput.current?.focus();
    this.setState({
      visible: !visible,
    });
  };

  handleChangeValue = (date: Date | null, event?: SyntheticEvent<any>) => {
    const { onDateSelected } = this.props;
    this.setState({ valueDate: date });
    // calendar change
    if (event) {
      this.setState({
        visible: false,
        inputValue: date,
      });
    }
    onDateSelected && onDateSelected();
    this.props.onChange(date);
  };

  handleChangeRange = (dates: Date[], event?: SyntheticEvent<any>) => {
    const dateStart = dates[0],
      dateEnd = dates[1];
    const rangeSelected = dateStart && dateEnd;
    this.setState({
      valueDate: null,
      startDate: dateStart,
      endDate: dateEnd,
    });
    // calendar change
    if (event) {
      this.setState({
        visible: !rangeSelected,
        inputValue: dates,
      });
    }
    this.props.onChange(dates);
  };

  handleChangeInput = (value: { value: string; masked: string }) => {
    this.setState({
      inputValue: value.value,
      endDate: null,
      startDate: null,
      valueDate: null,
      error: null,
    });

    if (this.props.range) {
      this.props.onChange([null, null]);
    } else {
      this.props.onChange(null);
    }
  };

  handleFormatValue = (value: Date | Date[] | string) => {
    if (this.props.formatValue) {
      return this.props.formatValue(value);
    } else {
      if (this.props.range && Array.isArray(value)) {
        return this.getValidDate(value[0]) + this.getValidDate(value[1]);
      } else {
        return value instanceof Date ? this.getValidDate(value) : '';
      }
    }
  };

  handleRemoveFormatValue = (value: string, value2?: string) => {
    if (this.props.removeFormatValue) {
      return this.props.removeFormatValue(value);
    } else {
      const parsedValue = getParsedValue(value, DEFAULT_DATE_FORMAT, this.props.localeName);
      const parsedValue2 = getParsedValue(value2 || '', DEFAULT_DATE_FORMAT, this.props.localeName);
      const validator = this.getValidator();
      const invalidValue = validator.invalidValue(parsedValue);
      const invalidValue2 = validator.invalidValue(parsedValue2);

      if (this.props.range) {
        this.setState({ error: validator.invalidRange(parsedValue, parsedValue2) });
        return [invalidValue ? null : parsedValue, invalidValue2 ? null : parsedValue2];
      } else {
        this.setState({ error: invalidValue });
        return invalidValue ? '' : parsedValue;
      }
    }
  };

  handleComplete = (value: Date | Date[] | undefined) => {
    if (!value) return;
    if (this.props.onComplete) {
      return this.props.onComplete(value);
    } else {
      if (this.props.range && Array.isArray(value)) {
        return this.handleChangeRange(value);
      }
      if (value instanceof Date) {
        return this.handleChangeValue(value);
      }
    }
  };

  onHide = () => {
    this.setState({
      visible: false,
    });
  };

  onFocus = (event: FocusEvent<HTMLInputElement>) => {
    this.props.onFocus?.(event);
    this.setState({ focused: true });
  };

  onBlur = (event: FocusEvent<HTMLInputElement>) => {
    this.props.onBlur?.(event);

    const { valueDate, startDate, endDate, error } = this.state;
    const validator = this.getValidator();
    let currentError: string | null = null;
    if (this.props.range) {
      currentError = this.state.inputValue && validator.invalidRange(startDate, endDate);
    } else {
      currentError = this.state.inputValue && validator.invalidValue(valueDate);
    }
    this.setState({
      visible: false,
      focused: false,
      error: error || currentError,
    });
  };

  getValidDate = (value: Date): string => {
    if (valid(value)) {
      return getFormattedValue(new Date(value), DEFAULT_DATE_FORMAT, this.props.localeName) || '';
    }
    return '';
  };

  renderCalendar() {
    const {
      size = 'big',
      calendarSize = 'big',
      width,
      label,
      placeholder,
      range,
      disabled,
      className,
      dataTestId,
      selected,
      ...props
    } = this.props;
    const { startDate, endDate, posX, posY } = this.state;
    return (
      <CalendarPopupComponent ref={this.refCalendar} position={{ X: posX, Y: posY }}>
        <Calendar
          {...props}
          simple
          size={calendarSize}
          range={range}
          selected={selected}
          startDate={startDate}
          endDate={endDate}
          validator={this.getValidator()}
          onChange={range ? this.handleChangeRange : this.handleChangeValue}
        />
      </CalendarPopupComponent>
    );
  }

  render() {
    const {
      size = 'big',
      calendarSize = 'big',
      range,
      width = this.props.width || CALENDAR_SIZES[calendarSize],
      disabled,
      className,
      dataTestId,
      calendarContainer,
      mask,
      icon,
      status,
      additionalText,
      onChange,
      ...props
    } = this.props;
    const { visible, inputValue, focused, error } = this.state;
    const iconSize = getIconSize(size);
    const errorMessage = !focused ? error : undefined;

    const iconServices = (
      <StyledCalendarSolidIcon
        disabled={disabled}
        active={visible}
        onMouseDown={(e) => {
          e.preventDefault();
          !disabled && this.handleToggleVisible(e);
        }}
      >
        <CalendarSolid width={iconSize} height={iconSize} />
      </StyledCalendarSolidIcon>
    );

    return (
      <DatePickerComponent
        ref={this.refDatePicker}
        width={width}
        className={className}
        data-test-id={dataTestId}
      >
        <DatePickerInputComponent>
          <Input.Mask
            {...props}
            refInput={this.refInput}
            width={'100%'}
            mask={mask || (range ? '99.99.9999 - 99.99.9999' : '99.99.9999')}
            value={inputValue}
            size={size}
            status={status ? status : errorMessage ? 'error' : undefined}
            additionalText={additionalText ? additionalText : errorMessage || undefined}
            icon={icon || iconServices}
            disabled={disabled}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            formatValue={this.handleFormatValue}
            removeFormatValue={this.handleRemoveFormatValue}
            onComplete={this.handleComplete}
            onChange={this.handleChangeInput}
          />
        </DatePickerInputComponent>
        {visible &&
          (calendarContainer
            ? ReactDOM.createPortal(this.renderCalendar(), calendarContainer)
            : this.renderCalendar())}
      </DatePickerComponent>
    );
  }
}
