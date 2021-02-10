import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { Calendar } from '../Calendar';
import { CalendarComponent } from '../Calendar/CalendarComponent';
import { DayComponent } from '../Calendar/DayComponent';
import { Input } from '../Inputs';
import { DatePicker } from '../DatePicker';

import { StyledCalendarSolidIcon } from './StyledCalendarSolidIcon';

jest.mock('../TooltipHOC', () => ({
  // eslint-disable-next-line react/display-name
  createTooltipHOC: (args: any) => args,
}));

jest.mock('../Icons/system/CalendarSolid.svg', () => ({
  // eslint-disable-next-line react/display-name
  ReactComponent: () => <div> CalendarIcon </div>,
}));

jest.mock('../common/default-theme', () => ({
  DEFAULT_THEME: {
    borderRadius: '',
    boxShadow: {},
    input: { iconPaddingTop: {} },
    color: {
      neutral: {},
      primary: {},
      opacity: {},
      error: {},
      success: {},
    },
  },
}));

const DAY_CLASS = DayComponent;

const testedDate = new Date(2020, 7, 1);
const testedDate2 = new Date(2020, 8, 19);

const emptyCallback = (_: Date | Array<Date | null>) => {
  /* do nothing */
};

const zeroPad = (num: string | number) => String(num).padStart(2, '0');

const getInputValue = (wrapper: ReactWrapper) =>
  wrapper.find('input').getDOMNode().attributes['value'].value;

const testErrorMessage = (error: string, initialValue: string, finalValue: string, props?: any) => {
  const wrapper = mount(<DatePicker {...props} onChange={emptyCallback} />);
  const input = wrapper.find('input');
  input.simulate('change', { target: { value: initialValue } });
  input.simulate('blur');

  expect(wrapper.find(Input.Mask).find(`div[children="${error}"]`).length).toBe(1);
  input.simulate('change', { target: { value: finalValue } });
  input.simulate('blur');

  expect(wrapper.find(Input.Mask).find(`div[children="${error}"]`).length).toBe(0);
};

describe('DatePicker', () => {
  it('should render component without opening calendar by default', () => {
    const wrapper = mount(<DatePicker selected={testedDate} onChange={emptyCallback} />);
    expect(wrapper.find(CalendarComponent).length).toBe(0);
  });

  it('should open calendar after "Calendar" button has been clicked', () => {
    const wrapper = mount(<DatePicker selected={testedDate} onChange={emptyCallback} />);
    wrapper.find(StyledCalendarSolidIcon).simulate('mouseDown');
    expect(wrapper.find(CalendarComponent).getDOMNode()).toBeInstanceOf(HTMLDivElement);
  });

  it('should contain correctly formatted input single value', () => {
    const wrapper = mount(<DatePicker selected={testedDate} onChange={emptyCallback} />);
    expect(getInputValue(wrapper)).toBe('01.08.2020');
  });

  it('should contain correctly formatted input range value', () => {
    const wrapper = mount(
      <DatePicker range startDate={testedDate} endDate={testedDate2} onChange={emptyCallback} />
    );
    expect(getInputValue(wrapper)).toBe('01.08.2020 - 19.09.2020');
  });

  it('should contain correctly formatted input single value for Validator.invalidXXX date', () => {
    const defaultValidator = Calendar.getDefaultValidator();
    const calendarValidator = {
      ...defaultValidator,
      invalidValue: (date?: Date | null): string | null => {
        const defaultError = defaultValidator.invalidValue(date);
        if (!date) return defaultError;
        const pastDateError = date.valueOf() <= testedDate.valueOf() ? 'Дата меньше текущей' : null;
        return defaultError || pastDateError;
      },
    };
    const wrapper = mount(
      <DatePicker selected={testedDate} validator={calendarValidator} onChange={emptyCallback} />
    );
    expect(getInputValue(wrapper)).toBe('01.08.2020');
  });

  it('should contain additional text for status == "error" (single, "Неверный формат даты")', () => {
    testErrorMessage('Неверный формат даты', '05.09.', '10.12.2020');
  });

  it('should contain additional text for status == "error" (single - minDate, "Дата вне диапазона")', () => {
    testErrorMessage('Дата вне диапазона', '05.09.2020', '15.09.2020', {
      minDate: new Date(2020, 8, 10),
    });
  });

  it('should contain additional text for status == "error" (single - maxDate, "Дата вне диапазона")', () => {
    testErrorMessage('Дата вне диапазона', '05.09.2020', '02.09.2020', {
      maxDate: new Date(2020, 8, 4),
    });
  });

  it('should contain additional text for status == "error" (range, "Начальная дата не валидна")', () => {
    testErrorMessage(
      'Начальная дата не валидна',
      '95.09.2020 - 14.09.2020',
      '05.09.2020 - 14.09.2020',
      { range: true }
    );
  });

  it('should contain additional text for status == "error" (range, "Конечная дата не валидна")', () => {
    testErrorMessage(
      'Конечная дата не валидна',
      '05.09.2020 - 94.09.2020',
      '05.09.2020 - 14.09.2020',
      { range: true }
    );
  });

  it('should contain additional text for status == "error" (range, "Даты не валидны")', () => {
    testErrorMessage('Даты не валидны', '95.09.2020 - 94.09.2020', '05.09.2020 - 14.09.2020', {
      range: true,
    });
  });

  it('should contain additional text for status == "error" (range, "Неверный формат дат")', () => {
    testErrorMessage('Неверный формат дат', '05.09.202 - 14.09.202', '05.09.2020 - 14.09.2020', {
      range: true,
    });
  });

  it('should contain additional text for status == "error" (range, "Конечная дата меньше начальной")', () => {
    testErrorMessage(
      'Конечная дата меньше начальной',
      '05.09.2020 - 04.09.2020',
      '05.09.2020 - 06.09.2020',
      { range: true }
    );
  });

  it('should set value to "null" when invalid date is set', () => {
    let day: Date | null = new Date();
    const wrapper = mount(
      <DatePicker
        selected={testedDate}
        onChange={(date: Date | null) => {
          day = date;
        }}
      />
    );
    wrapper.setProps({
      selected: null,
    });
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: '05.09.' } });
    expect(day).toBeNull();
    expect(getInputValue(wrapper)).toBe('05.09');
  });

  it('should set both dates of [startDate, endDate] to "null" and allow to set both dates inside the calendar when input start date is invalid', () => {
    const firstDayItemNumber = 8;
    const dayItemOffset = 10;
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    let startDay: Date | null = new Date();
    let endDay: Date | null = new Date();
    const wrapper = mount(
      <DatePicker
        range
        startDate={null}
        endDate={null}
        onChange={(date: Array<Date | null>) => {
          startDay = date[0];
          endDay = date[1];
        }}
      />
    );

    const input = wrapper.find('input');
    input.simulate('change', { target: { value: '/// - 10.20' } });
    expect(startDay).toBeNull();
    expect(endDay).toBeNull();
    expect(getInputValue(wrapper)).toBe('10.20');

    wrapper.find(StyledCalendarSolidIcon).simulate('mouseDown');
    const dayElements = wrapper.find(DAY_CLASS);
    const firstDay = parseInt(dayElements.at(firstDayItemNumber).text());
    dayElements.at(firstDayItemNumber).simulate('mouseDown');
    dayElements.at(firstDayItemNumber + dayItemOffset).simulate('mouseDown');
    expect(startDay).toEqual(new Date(currentYear, currentMonth, firstDay));
    expect(endDay).toEqual(new Date(currentYear, currentMonth, firstDay + dayItemOffset));
    expect(getInputValue(wrapper)).toBe(
      `${zeroPad(firstDay)}.${zeroPad(currentMonth + 1)}.${currentYear} - ${zeroPad(
        firstDay + dayItemOffset
      )}.${zeroPad(currentMonth + 1)}.${currentYear}`
    );
  });

  it('should set only end date of [startDate, endDate] to "null" and allow to set end date inside the calendar when input end date is invalid', () => {
    let startDay: Date | null = new Date();
    let endDay: Date | null = new Date();
    const wrapper = mount(
      <DatePicker
        range
        startDate={null}
        endDate={null}
        onChange={(date: Array<Date | null>) => {
          startDay = date[0];
          endDay = date[1];
        }}
      />
    );

    const input = wrapper.find('input');
    input.simulate('change', { target: { value: '05.09.2020' } });
    expect(startDay).toBeNull();
    expect(endDay).toBeNull();
    wrapper.setProps({
      startDate: startDay,
    });
    expect(getInputValue(wrapper)).toBe('05.09.2020');
    wrapper.setProps({
      startDate: new Date(2020, 8, 5),
    });
    wrapper.find(StyledCalendarSolidIcon).simulate('mouseDown');
    const dayElement = wrapper.find(DAY_CLASS);
    dayElement.at(15).simulate('mouseDown');
    expect(startDay).toEqual(new Date(2020, 8, 5));
    expect(endDay).toEqual(new Date(2020, 8, 15));
    expect(getInputValue(wrapper)).toBe('05.09.2020 - 15.09.2020');
  });

  it('should have selected calendar date', () => {
    const wrapper = mount(<DatePicker selected={new Date(2020, 1, 29)} onChange={emptyCallback} />);
    wrapper.find(StyledCalendarSolidIcon).simulate('mouseDown');

    const dayElements = wrapper.find(DAY_CLASS);
    for (let i = 0; i < dayElements.length; ++i) {
      expect(dayElements.at(i).prop('selected')).toBe(i === 33);
    }
    const selectedDayElement = dayElements.at(33);
    expect(selectedDayElement.text()).toBe('29');
    expect(selectedDayElement.prop('selected')).toBeTruthy();
  });

  it('should change day when new day has been clicked', () => {
    let clickedDay: Date | Array<Date | null> | null = null;
    const wrapper = mount(
      <DatePicker
        selected={testedDate}
        onChange={(date: Date | Array<Date | null>) => {
          clickedDay = date;
        }}
      />
    );
    wrapper.setProps({
      selected: clickedDay,
    });
    expect(getInputValue(wrapper)).toBe('01.08.2020');
    wrapper.find(StyledCalendarSolidIcon).simulate('mouseDown');

    const dayElement = wrapper.find(DAY_CLASS);
    expect(dayElement.length).toBe(7 * 6);

    dayElement.at(20).simulate('mouseDown');
    expect(clickedDay).toEqual(new Date(2020, 7, 16));
    wrapper.setProps({
      selected: clickedDay,
    });
    expect(getInputValue(wrapper)).toBe('16.08.2020');
  });

  it('should change days range when start and end days have been clicked', () => {
    let startDate = testedDate;
    let endDate = testedDate;
    const wrapper = mount(
      <DatePicker
        startDate={startDate}
        endDate={endDate}
        range
        onChange={(date: Date | Array<Date | null>) => {
          startDate = date[0];
          endDate = date[1];
        }}
      />
    );
    wrapper.find(StyledCalendarSolidIcon).simulate('mouseDown');

    const dayElement = wrapper.find(DAY_CLASS);
    expect(dayElement.length).toBe(7 * 6);

    dayElement.at(20).simulate('mouseDown');
    expect(startDate).toEqual(new Date(2020, 7, 16));
    expect(endDate).toBeNull();
    wrapper.setProps({
      startDate: startDate,
      endDate: endDate,
    });
    expect(getInputValue(wrapper)).toBe('16.08.2020');

    dayElement.at(25).simulate('mouseDown');
    expect(startDate).toEqual(new Date(2020, 7, 16));
    expect(endDate).toEqual(new Date(2020, 7, 21));

    expect(getInputValue(wrapper)).toBe('16.08.2020 - 21.08.2020');
  });
});
