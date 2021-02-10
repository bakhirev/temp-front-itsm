/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/display-name */
import React from 'react';
import { shallow } from 'enzyme';

import { ReactComponent as ChevronDownOutline } from '../Icons/system/ChevronDownOutline.svg';
import { ReactComponent as ChevronUpOutline } from '../Icons/system/ChevronUpOutline.svg';
import { MultiButton } from '../MultiButton';
import type { IMultiButtonProps } from '../MultiButton';
import type { IOverflowMenuProps } from '../OverflowMenu';

jest.mock('../common', () => ({
  DEFAULT_THEME: {},
}));

jest.mock('../OverflowMenu', () => ({
  OverflowMenu: ({ defaultValue, list, value, onChange }: IOverflowMenuProps) => (
    <div onClick={() => onChange?.(list[2])} />
  ),
}));

jest.mock('../Icons/system/ChevronDownOutline.svg', () => ({
  ReactComponent: () => <div> down icon </div>,
}));

jest.mock('../Icons/system/ChevronUpOutline.svg', () => ({
  ReactComponent: () => <div> up icon </div>,
}));

describe('MultiButton', () => {
  const requiredProps: IMultiButtonProps = {
    list: [
      { label: 'foo', value: 2 },
      { label: 'bar', value: 3 },
      { label: 'baz', value: 4 },
    ],
    button: { label: 'zoo', value: 1 },
  };

  it('should render component with required props', () => {
    const wrapper = shallow(<MultiButton {...requiredProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should pass on button's props to Button component", () => {
    const buttonProps: IMultiButtonProps = {
      ...requiredProps,
      disabled: true,
      kind: 'secondary',
      size: 'small',
    };

    const wrapper = shallow(<MultiButton {...buttonProps} />);
    const button = wrapper.childAt(0).childAt(0).childAt(0);

    expect(button.prop('disabled')).toEqual(buttonProps.disabled);
    expect(button.prop('kind')).toEqual(buttonProps.kind);
    expect(button.prop('size')).toEqual(buttonProps.size);
  });

  it("should pass on menu's props to OverflowMenu component", () => {
    const menuProps = {
      ...requiredProps,
      disabled: true,
    };

    const wrapper = shallow(<MultiButton {...menuProps} />);
    const styledOverflowMenu = wrapper.childAt(0).childAt(1);

    expect(styledOverflowMenu.prop('list')).toEqual(menuProps.list);
    expect(styledOverflowMenu.prop('disabled')).toEqual(menuProps.disabled);
  });

  it('should render DropdownButton with arrow down icon by default', () => {
    const wrapper = shallow(<MultiButton {...requiredProps} />);
    const dropdownButton = wrapper.childAt(0).childAt(0).childAt(2);
    const children = dropdownButton.prop('children');

    expect(children).toEqual(<ChevronDownOutline height={24} width={24} />);
  });

  it('should render DropdownButton with arrow up icon when user clicks on it', () => {
    const wrapper = shallow(<MultiButton {...requiredProps} />);
    const dropdownButton = wrapper.childAt(0).childAt(0).childAt(2);

    dropdownButton.simulate('click');
    wrapper.update();

    const updatedButton = wrapper.childAt(0).childAt(0).childAt(2);
    const children = updatedButton.prop('children');

    expect(children).toEqual(<ChevronUpOutline height={24} width={24} />);
  });

  it('should open menu when user clicks on DropdownButton', () => {
    const wrapper = shallow(<MultiButton {...requiredProps} />);
    const dropdownButton = wrapper.childAt(0).childAt(0).childAt(2);
    const styledOverflowMenu = wrapper.childAt(0).childAt(1);
    expect(styledOverflowMenu.prop('menu').opened).toBeFalsy();

    dropdownButton.simulate('click');
    wrapper.update();

    const updatedStyledOverflowMenu = wrapper.childAt(0).childAt(1);
    expect(updatedStyledOverflowMenu.prop('menu').opened).toBeTruthy();
  });

  it('should call onChange with new value when user chooses one from the list', () => {
    const handleChange = jest.fn();
    const wrapper = shallow(<MultiButton {...requiredProps} onChange={handleChange} />);

    const overflowMenu = wrapper.childAt(0).childAt(1).dive().dive();
    overflowMenu.simulate('click');

    expect(handleChange).toBeCalledWith(requiredProps.list[2]);
  });
});
