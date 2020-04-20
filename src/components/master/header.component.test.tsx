import { withStyles } from "@material-ui/core";
import style from "./style";
import { shallow } from "enzyme";
import React from "react";
import { HeaderComponent } from "./header.component";
import { render } from "@testing-library/react";

describe("<HeaderComponent />", () => {
  const Component = withStyles(style)(HeaderComponent);
  test("toMatchSnapshot()", () => {
    const SetHeight = jest.fn();
    const container = shallow(<Component SetHeight={SetHeight} Open={false} />);
    expect(container).toMatchSnapshot();
  });
  test("renders call SetHeight", () => {
    const SetHeight = jest.fn();
    render(<Component SetHeight={SetHeight} Open={false} />);
    expect(SetHeight).toBeCalled();
  });
  test("renders call Open menu", () => {
    const SetHeight = jest.fn();
    const { container } = render(
      <Component SetHeight={SetHeight} Open={true} />
    );
    const expected = container.querySelectorAll(".button-control-sidebar");
    expect(expected.length).toBe(1);
  });
  describe("should by test function", () => {
    test("handleProfileMenuOpen()", () => {
      const SetHeight = jest.fn();
      const container = shallow(
        <Component SetHeight={SetHeight} Open={false} />
      )
        .dive()
        .instance();
      const event = {
        currentTarget: true,
      };
      container.handleProfileMenuOpen(event);
      const expected = container.state.anchorEl;
      expect(expected).toBe(true);
    });

    test("handleMobileMenuClose()", () => {
      const SetHeight = jest.fn();
      const container = shallow(
        <Component SetHeight={SetHeight} Open={false} />
      )
        .dive()
        .instance();
      container.handleMobileMenuClose();
      const expected = container.state.mobileMoreAnchorEl;
      expect(expected).toBe(null);
    });

    test("handleMenuClose()", () => {
      const SetHeight = jest.fn();
      const container = shallow(
        <Component SetHeight={SetHeight} Open={false} />
      )
        .dive()
        .instance();
      container.handleMenuClose();
      const expected = container.state.anchorEl;
      expect(expected).toBe(null);
    });

    test("handleMobileMenuOpen()", () => {
      const SetHeight = jest.fn();
      const container = shallow(
        <Component SetHeight={SetHeight} Open={false} />
      )
        .dive()
        .instance();
      const event = {
        currentTarget: true,
      };
      container.handleMobileMenuOpen(event);
      const expected = container.state.mobileMoreAnchorEl;
      expect(expected).toBe(true);
    });
    test("handleDrawerOpen()", () => {
      const SetHeight = jest.fn();
      const SetOpen = jest.fn();
      const container = shallow(
        <Component SetHeight={SetHeight} Open={false} SetOpen={SetOpen} />
      )
        .dive()
        .instance();
      container.handleDrawerOpen();
      expect(SetOpen).toBeCalled();
    });

    test("handleDrawerClose()", () => {
      const SetHeight = jest.fn();
      const SetOpen = jest.fn();
      const container = shallow(
        <Component SetHeight={SetHeight} Open={false} SetOpen={SetOpen} />
      )
        .dive()
        .instance();
      container.handleDrawerClose();
      expect(SetOpen).toBeCalled();
    });
  });
});
