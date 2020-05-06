import { withStyles } from "@material-ui/core";
import style from "./style";
import AppButton from ".";
import { shallow, mount } from "enzyme";
import React from "react";
import { render } from "@testing-library/react";

describe("<AppButton />", () => {
  const Component = withStyles(style)(AppButton);

  test("should show text()", () => {
    const { container } = render(<Component text={`AppButton`} />);
    const expected = container.querySelector(".MuiButton-label");
    expect(expected?.textContent).toBe("AppButton");
  });
  test("should call onClick()", () => {
    const onClick = jest.fn();
    const container = mount(<Component text={`AppButton`} onClick={onClick} />);
    const expected = container.find("button");
    expected.at(0).simulate("click");
    expect(onClick).toBeCalled();
  });
  test("should call onDoubleClick()", () => {
    const onDoubleClick = jest.fn();
    const container = mount(
      <Component text={`AppButton`} onDoubleClick={onDoubleClick} />
    );
    const expected = container.find("button");
    expected.at(0).simulate("dblclick");
    expect(onDoubleClick).toBeCalled();
  });
});
