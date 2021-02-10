/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/display-name */
import React from 'react';
import { shallow } from 'enzyme';

import { ReactComponent as ChevronUpOutline } from '../Icons/system/ChevronUpOutline.svg';
import { ReactComponent as ChevronDownOutline } from '../Icons/system/ChevronDownOutline.svg';
import { IDropdownButtonProps, DropdownButton } from '../DropdownButton';
import type { IButtonProps } from '../Button';
import type { IOverflowMenuProps } from '../OverflowMenu';

jest.mock('../Button', () => ({
  Button: ({ disabled, kind, size, onClick }: IButtonProps) => <button onClick={onClick} />,
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

describe('DropdownButton', () => {
  const requiredProps: IDropdownButtonProps = {
    list: [
      { label: 'foo', value: 1 },
      { label: 'bar', value: 2 },
      { label: 'baz', value: 3 },
    ],
  };

  it('should render component with required props', () => {
    const wrapper = shallow(<DropdownButton {...requiredProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should pass on button's props to Button component", () => {
    const buttonProps: IDropdownButtonProps = {
      ...requiredProps,
      disabled: true,
      kind: 'white',
      size: 'small',
    };

    const wrapper = shallow(<DropdownButton {...buttonProps} />);
    const button = wrapper.find('Button');

    expect(button.prop('disabled')).toEqual(buttonProps.disabled);
    expect(button.prop('kind')).toEqual(buttonProps.kind);
    expect(button.prop('size')).toEqual(buttonProps.size);
  });

  it("should pass on menu's props to OverflowMenu component", () => {
    const menuProps = {
      defaultValue: { label: 'foo', value: 1 },
      list: [],
      value: { label: 'baz', value: 3 },
    };

    const wrapper = shallow(<DropdownButton {...menuProps} />);
    const styledOverflowMenu = wrapper.childAt(0).childAt(1);

    expect(styledOverflowMenu.prop('list')).toEqual(menuProps.list);
    expect(styledOverflowMenu.prop('defaultValue')).toEqual(menuProps.defaultValue);
    expect(styledOverflowMenu.prop('value')).toEqual(menuProps.value);
  });

  it('should render Button with right icon', () => {
    const wrapper = shallow(<DropdownButton {...requiredProps}>Dropdown</DropdownButton>);

    const button = wrapper.find('Button');
    const children = button.prop('children');
    const lastChild =
      children && Array.isArray(children) ? children[children.length - 1] : children;

    expect(typeof lastChild === 'object').toBeTruthy();
  });

  it('should render Button with arrow down icon by default', () => {
    const wrapper = shallow(<DropdownButton {...requiredProps} />);

    const button = wrapper.find('Button');
    const children = button.prop('children');
    const lastChild =
      children && Array.isArray(children) ? children[children.length - 1] : children;

    expect(lastChild).toEqual(<ChevronDownOutline height={24} width={24} />);
  });

  it('should render Button with arrow up icon when user clicks on it', () => {
    const wrapper = shallow(<DropdownButton {...requiredProps} />);
    const button = wrapper.find('Button');

    button.simulate('click');
    wrapper.update();

    const updatedButton = wrapper.find('Button');
    const children = updatedButton.prop('children');
    const lastChild =
      children && Array.isArray(children) ? children[children.length - 1] : children;

    expect(lastChild).toEqual(<ChevronUpOutline height={24} width={24} />);
  });

  it('should open menu when user clicks on button', () => {
    const wrapper = shallow(<DropdownButton {...requiredProps} />);
    const button = wrapper.find('Button');
    const styledOverflowMenu = wrapper.childAt(0).childAt(1);
    expect(styledOverflowMenu.prop('menu').opened).toBeFalsy();

    button.simulate('click');
    wrapper.update();

    const updatedStyledOverflowMenu = wrapper.childAt(0).childAt(1);
    expect(updatedStyledOverflowMenu.prop('menu').opened).toBeTruthy();
  });

  it('should call onChange with new value when user chooses one the the list', () => {
    const handleChange = jest.fn();
    const wrapper = shallow(<DropdownButton {...requiredProps} onChange={handleChange} />);

    const overflowMenu = wrapper.childAt(0).childAt(1).dive().dive();
    overflowMenu.simulate('click');

    expect(handleChange).toBeCalledWith(requiredProps.list[2]);
  });
});
