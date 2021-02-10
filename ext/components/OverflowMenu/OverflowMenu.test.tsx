import React from 'react';
import { shallow } from 'enzyme';

import { OverflowMenu } from './';

jest.mock('../common', () => ({
  DEFAULT_THEME: {},
  Z_INDEXES: {
    TOOLTIP: 777,
  },
}));

describe('OverflowMenu', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const overflowMenuProps = {
    list: [
      { value: 1, label: 'Москва' },
      { value: 2, label: 'Новгород' },
      { value: 3, label: 'Орел' },
    ],
  };

  it('should render component with required properties', () => {
    const wrapper = shallow(<OverflowMenu {...overflowMenuProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with medium size', () => {
    const wrapper = shallow(<OverflowMenu {...overflowMenuProps} size={'medium'} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with small size', () => {
    const wrapper = shallow(<OverflowMenu {...overflowMenuProps} size={'small'} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with disabled state', () => {
    const wrapper = shallow(<OverflowMenu {...overflowMenuProps} disabled />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with right menu alignment', () => {
    const wrapper = shallow(<OverflowMenu {...overflowMenuProps} menu={{ alignment: 'right' }} />);
    expect(wrapper).toMatchSnapshot();
  });
});
