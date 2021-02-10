import React from 'react';
import { shallow } from 'enzyme';

import { Input } from '../../Inputs';

import { MaskField } from './MaskField';

jest.mock('../../common', () => ({
  DEFAULT_THEME: {
    color: {
      neutral: {
        50: '',
      },
    },
  },
  Z_INDEXES: {
    INFORMER: 0,
  },
}));

const textError = `Ошибка`;
const label = 'Введите номер телефона';
const changeUsernameSpy = jest.fn();

describe('Input.Mask', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call onChange when user presses keys in input mask field, with mask 9999 9999 9999 9999 ', () => {
    const wrapper = shallow(
      <Input.Mask
        mask={'9999 9999 9999 9999'}
        value={''}
        onChange={changeUsernameSpy}
        label={label}
        size={'small'}
      />
    );
    const input = wrapper.dive().find(MaskField).dive().find('#input-mask');
    input.simulate('change', { target: { value: '99999999' } });
    expect(changeUsernameSpy).toBeCalledTimes(1);
    expect(changeUsernameSpy).toBeCalledWith({ masked: '9999 9999', value: '99999999' });
  });

  it('should call onChange when user presses keys in input mask field, with mask 99.99.9999', () => {
    const wrapper = shallow(
      <Input.Mask
        mask={'99.99.9999'}
        value={''}
        onChange={changeUsernameSpy}
        label={label}
        size={'small'}
      />
    );

    const input = wrapper.dive().find(MaskField).dive().find('#input-mask');
    input.simulate('change', { target: { value: '99999999' } });
    expect(changeUsernameSpy).toBeCalledTimes(1);
    expect(changeUsernameSpy).toBeCalledWith({ masked: '99.99.9999', value: '99999999' });
  });

  it('should call onChange when user presses keys in input mask field, with mask +7(999) 999 9999', () => {
    const wrapper = shallow(
      <Input.Mask
        mask={'+7(999) 999 9999'}
        value={'343'}
        onChange={changeUsernameSpy}
        label={label}
        size={'small'}
      />
    );

    const input = wrapper.dive().find(MaskField).dive().find('#input-mask');
    input.simulate('change', { target: { value: '99999999999' } });
    expect(changeUsernameSpy).toBeCalledTimes(1);
    expect(changeUsernameSpy).toBeCalledWith({ masked: '+7(999) 999 9999', value: '99999999999' });
  });

  it('should call onChange when user presses keys in input mask field, with mask 99.99.9999 - 99.99.9999', () => {
    const wrapper = shallow(
      <Input.Mask
        mask={'99.99.9999 - 99.99.9999'}
        value={''}
        onChange={changeUsernameSpy}
        label={label}
        size={'small'}
      />
    );

    const input = wrapper.dive().find(MaskField).dive().find('#input-mask');
    input.simulate('change', { target: { value: '9999999999999999' } });
    expect(changeUsernameSpy).toBeCalledTimes(1);
    expect(changeUsernameSpy).toBeCalledWith({
      masked: '99.99.9999 - 99.99.9999',
      value: '9999999999999999',
    });
  });

  it('should render component with error status', () => {
    const wrapper = shallow(
      <Input.Mask
        mask={'+7(999) 999 9999'}
        value={''}
        onChange={(value: any) => value}
        label={label}
        additionalText={textError}
        status={'error'}
        size={'big'}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with error status', () => {
    const wrapper = shallow(
      <Input.Mask
        mask={'+7(999) 999 9999'}
        value={''}
        onChange={(value: any) => value}
        label={label}
        additionalText={textError}
        status={'error'}
        size={'big'}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
