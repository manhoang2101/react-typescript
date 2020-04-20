import { withStyles } from "@material-ui/core";
import style from "./style";
import AppCheckBox from ".";
import { shallow } from "enzyme";
import React from "react";
import { render } from "@testing-library/react";

describe("<AppCheckBox />", () => {
  const Component = withStyles(style)(AppCheckBox);
  test("toMatchSnapshot()", () => {
    const container = shallow(<Component checked={false} />);
    expect(container).toMatchSnapshot();
  });
  test("should call handleChange()", () => {
    const handleChange = jest.fn();
    const { container } = render(
      <Component checked={false} onChange={handleChange} />
    );
    const input = container.querySelector("input");
    input?.click();
    expect(handleChange).toBeCalled();
  });
  test("should call show Error", () => {
    const handleChange = jest.fn();
    const { container } = render(
      <Component
        error
        helperText={`Loi`}
        checked={false}
        onChange={handleChange}
      />
    );
    const input = container.querySelectorAll(".data-test-FormHelperText");
    expect(input?.item(0).textContent).toBe(`Loi`);
  });
});
