import { withStyles } from "@material-ui/core";
import style from "./style";
import { shallow } from "enzyme";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SidebarComponent from "./sidebar.component";

describe("<SidebarComponent />", () => {
  const Component = withStyles(style)(SidebarComponent);
  test("toMatchSnapshot()", () => {
    const container = shallow(<Component Open={false} />);
    expect(container).toMatchSnapshot();
  });
  test("renders call handleDrawerClose", () => {
    const handleDrawerClose = jest.fn();
    const { container } = render(
      <Component HandleDrawerClose={handleDrawerClose} Open={true} />
    );
    const el = container.querySelectorAll(".handle-drawer-button");
    fireEvent.click(el.item(0));
    expect(handleDrawerClose).toBeCalled();
  });
});
