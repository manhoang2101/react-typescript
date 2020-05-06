import { withStyles } from "@material-ui/core";
import style from "./style";
import AppCheckBox from ".";
import { shallow } from "enzyme";
import React from "react";
import { render } from "@testing-library/react";

describe("<AppCheckBox />", () => {
  const Component = withStyles(style)(AppCheckBox);
  test("should call handleOnChange()", () => {
    const handleOnChange = jest.fn();
    const { container } = render(
      <Component checked={false} onChange={handleOnChange} />
    );
    const input = container.querySelector("input");
    input?.click();
    expect(handleOnChange).toBeCalled();
  });
  test("should call checkbox of group", () => {
    const handleOnChange = jest.fn();
    const { container } = render(
      <Component checked={false} onChange={handleOnChange} isGroup />
    );
    const input = container.querySelectorAll(".App-FormControlLabel");

    expect(input.length).toBe(1);
  });
  test("should call show Error", () => {
    const handleOnChange = jest.fn();
    const { container } = render(
      <Component
        error
        helperText={`Loi`}
        checked={false}
        onChange={handleOnChange}
      />
    );
    const input = container.querySelectorAll(".App-FormHelperText");
    expect(input?.item(0).textContent).toBe(`Loi`);
  });
});
