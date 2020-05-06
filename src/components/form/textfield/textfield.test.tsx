import { withStyles } from "@material-ui/core";
import style from "./style";
import AppTextField from ".";
import { shallow, mount } from "enzyme";
import React from "react";

describe("<AppRadio />", () => {
  const Component = withStyles(style)(AppTextField);
  test("should call handleOnChange()", () => {
    const handleOnChange = jest.fn();
    const container = mount(<Component onChange={handleOnChange} />);
    const input = container.find("input");
    input.at(0).simulate("change");
    expect(handleOnChange).toBeCalled();
  });
  test("should call handleOnFocus()", () => {
    const handleOnFocus = jest.fn();
    let wrapper = shallow(
      <Component
        onFocus={handleOnFocus}
        placeholder="placeholder"
        label="label"
      />
    );
    let component = wrapper.dive().dive().instance();
    component.handleOnFocus(null);
    expect(handleOnFocus).toHaveBeenCalled();
  });
  test("should call handleOnClick()", () => {
    const handleOnClick = jest.fn();
    let wrapper = shallow(
      <Component
        onClick={handleOnClick}
        placeholder="placeholder"
        label="label"
      />
    );
    let component = wrapper.dive().dive().instance();
    component.handleOnClick(null);
    expect(handleOnClick).toHaveBeenCalled();
  });

  test("should call handleOnBlur()", () => {
    const handleOnBlur = jest.fn();
    let wrapper = shallow(<Component onBlur={handleOnBlur} />);
    let component = wrapper.dive().dive().instance();
    component.handleOnBlur(null);
    expect(handleOnBlur).toHaveBeenCalled();
  });
});
