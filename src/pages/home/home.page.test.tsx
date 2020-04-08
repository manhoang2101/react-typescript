import { shallow } from "enzyme";
import React from "react";
import { render } from "@testing-library/react";
import { HomePage } from ".";

describe("<HomePage />", () => {
  test("toMatchSnapshot()", () => {
    const container = shallow(<HomePage />);
    expect(container).toMatchSnapshot();
  });
  test("renders call", () => {
    const { container } = render(<HomePage />);
    expect(container.textContent).toBe("Home");
  });
});
