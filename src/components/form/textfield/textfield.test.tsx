import { withStyles } from "@material-ui/core";
import style from "./style";
import AppTextField from ".";
import { shallow, mount } from "enzyme";
import React from "react";

describe("<AppRadio />", () => {
  const Component = withStyles(style)(AppTextField);
  test("toMatchSnapshot()", () => {
    const container = shallow(<Component />);
    expect(container).toMatchSnapshot();
  });
  test("should call handleChange()", () => {
    const handleChange = jest.fn();
    const container = mount(<Component onChange={handleChange} />);
    const input = container.find("input");
    input.at(0).simulate("change");
    expect(handleChange).toBeCalled();
  });
  test("should call handleFocus()", () => {
    const handleFocus = jest.fn();
    let wrapper = shallow(
      <Component
        onFocus={handleFocus}
        placeholder="placeholder"
        label="label"
      />
    );
    let component = wrapper.dive().dive().instance();
    component.handleFocus(null);
    expect(handleFocus).toHaveBeenCalled();
  });
  test("should call handleBlur()", () => {
    const handleBlur = jest.fn();
    let wrapper = shallow(<Component onBlur={handleBlur} />);
    let component = wrapper.dive().dive().instance();
    component.handleBlur(null);
    expect(handleBlur).toHaveBeenCalled();
  });
});
