import React from "react";
import { render } from "@testing-library/react";
import { HomePage } from ".";

describe("<HomePage />", () => {
  test("renders call", () => {
    const { container } = render(<HomePage />);
    expect(container.textContent).toBe("Home");
  });
});
