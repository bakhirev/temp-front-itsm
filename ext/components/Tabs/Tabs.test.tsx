import React from 'react';
import { shallow } from 'enzyme';

import { Tab } from './Tab';

import { Tabs } from './';

jest.mock('../common', () => ({
  DEFAULT_THEME: {},
  Z_INDEXES: {
    TOOLTIP: 777,
  },
}));

describe('Tabs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const menu = [
    { value: 4, label: 'Самара' },
    { value: 5, label: 'Липецк' },
  ];

  const tabsRequiredProps = {
    list: [
      { value: 1, label: 'Москва', active: true },
      { value: 2, label: 'Новгород' },
      { value: 3, label: 'Орел' },
    ],
    onChange: jest.fn(),
  };

  const tabsExtendedProps = {
    list: [
      { value: 1, label: 'Москва', active: true },
      // eslint-disable-next-line react/display-name
      { value: 2, label: 'Новгород', icon: () => <div /> },
      { value: 3, label: 'Орел', badge: 5 },
    ],
    onChange: jest.fn(),
  };

  const tabsDisabledProps = {
    list: [
      { value: 1, label: 'Москва', active: true },
      { value: 2, label: 'Новгород', disabled: true },
    ],
    onChange: jest.fn(),
  };

  it('should render component with required properties', () => {
    const wrapper = shallow(<Tabs {...tabsRequiredProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with small size', () => {
    const wrapper = shallow(<Tabs {...tabsRequiredProps} size={'small'} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component without underline', () => {
    const wrapper = shallow(<Tabs {...tabsRequiredProps} underline={false} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with overflowMenu', () => {
    const wrapper = shallow(<Tabs {...tabsRequiredProps} overflowMenu={{ list: menu }} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component in which tabs have icon and badge', () => {
    const wrapper = shallow(<Tabs {...tabsExtendedProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onChange when user clicks tab', () => {
    const wrapper = shallow(<Tabs {...tabsRequiredProps} />);
    const tabs = wrapper.find(Tab);
    tabs.at(1).simulate('click');
    const { onChange } = tabsRequiredProps;
    expect(onChange).toBeCalledTimes(1);
  });

  it('should not call onChange when user clicks disabled tab', () => {
    const wrapper = shallow(<Tabs {...tabsDisabledProps} />);
    const tabs = wrapper.find(Tab);
    tabs.at(1).simulate('click');
    const { onChange } = tabsRequiredProps;
    expect(onChange).toBeCalledTimes(0);
  });
});
