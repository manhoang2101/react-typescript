import { withStyles } from "@material-ui/core";
import style from "./style";
import { shallow } from "enzyme";
import React from "react";
import { render } from "@testing-library/react";
import MenuComponent from "./menu.component";

describe("<MenuComponent />", () => {
  const Component = withStyles(style)(MenuComponent);

  test("renders call SetHeight", () => {
    render(<Component MenuId={`MenuId`} MobileMenuId={`MobileMenuId`} />);
    const expected = document.querySelectorAll("#MenuId");
    expect(expected.length).toBe(1);
  });
});
