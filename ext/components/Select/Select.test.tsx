import React from 'react';
import { shallow } from 'enzyme';

import { ReactComponent as PersonOutline } from '../Icons/system/PersonOutline.svg';
import { ReactComponent as SaveOutline } from '../Icons/system/SaveOutline.svg';
import { ReactComponent as PrintOutline } from '../Icons/system/PrintOutline.svg';
import { Select, ISelectComponentProps } from '../Select';
jest.mock('../common', () => ({
  DEFAULT_THEME: {},
  Z_INDEXES: {
    TOOLTIP: 777,
  },
}));

describe('Select', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const selectRequiredProps: ISelectComponentProps = {
    list: [
      { value: 1, label: 'Москва' },
      { value: 2, label: 'Новгород' },
      { value: 3, label: 'Орел' },
    ],
  };

  const selectWithIconRequiredProps: ISelectComponentProps = {
    list: [
      { value: 1, label: 'Москва', icon: PersonOutline },
      { value: 2, label: 'Новгород', icon: SaveOutline },
      { value: 3, label: 'Орел', icon: PrintOutline },
    ],
  };

  const cardOrProductSelectProps: ISelectComponentProps = {
    list: [
      {
        value: 17812,
        label: '123000.56',
        note: 'Дебетовая карта (*7812)',
        // eslint-disable-next-line react/display-name
        image: () => <div />,
        currency: 'rur',
      },
      {
        value: 298,
        label: '905.00',
        note: 'Кредитная карта (*1234)',
        // eslint-disable-next-line react/display-name
        image: () => <div />,
        currency: 'usd',
      },
      {
        value: 334,
        label: '7775.00',
        note: 'Дебетовая карта (*9845)',
        // eslint-disable-next-line react/display-name
        image: () => <div />,
        currency: 'eur',
      },
    ],
  };

  it('should render component with required properties', () => {
    const wrapper = shallow(<Select {...selectRequiredProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with required properties and icon', () => {
    const wrapper = shallow(<Select {...selectWithIconRequiredProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with small size', () => {
    const wrapper = shallow(<Select {...selectRequiredProps} size="small" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with micro size', () => {
    const wrapper = shallow(<Select {...selectRequiredProps} size="micro" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with disabled state', () => {
    const wrapper = shallow(<Select {...selectRequiredProps} disabled />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with error state', () => {
    const wrapper = shallow(<Select {...selectRequiredProps} error />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with label, placeholder, additionalText', () => {
    const wrapper = shallow(
      <Select
        {...selectRequiredProps}
        label="Город"
        placeholder="Выберите из списка"
        additionalText="Место фактического проживания"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with card type', () => {
    const wrapper = shallow(<Select {...cardOrProductSelectProps} type="card" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with product type', () => {
    const wrapper = shallow(<Select {...cardOrProductSelectProps} type="product" />);
    expect(wrapper).toMatchSnapshot();
  });
});
