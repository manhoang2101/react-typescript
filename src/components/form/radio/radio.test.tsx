import { withStyles } from "@material-ui/core";
import style from "./style";
import AppRadio, { IRadioItem } from ".";
import { shallow } from "enzyme";
import React from "react";
import { render } from "@testing-library/react";

describe("<AppRadio />", () => {
  const Component = withStyles(style)(AppRadio);

  test("should call handleOnChange()", () => {
    const items: IRadioItem[] = [
      { label: "Radio1", value: "Radio1", color: "primary" },
      { label: "Radio2", value: "Radio2" },
      { label: "Radio3", value: "Radio3" },
      { label: "Radio4", value: "Radio4" },
    ];
    const handleOnChange = jest.fn();
    const { container } = render(
      <Component radioItems={items} onChange={handleOnChange} />
    );
    const input = container.querySelector("input");
    input?.click();
    expect(handleOnChange).toBeCalled();
  });
  test("should call show Error", () => {
    const handleOnChange = jest.fn();
    const items: IRadioItem[] = [
      { label: "Radio1", value: "Radio1", color: "primary" },
      { label: "Radio2", value: "Radio2" },
      { label: "Radio3", value: "Radio3" },
      { label: "Radio4", value: "Radio4" },
    ];
    const { container } = render(
      <Component
        radioItems={items}
        error
        helperText={`Loi`}
        onChange={handleOnChange}
      />
    );
    const input = container.querySelectorAll(".data-test-FormHelperText");
    expect(input?.item(0).textContent).toBe(`Loi`);
  });
});
