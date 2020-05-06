import { withStyles } from "@material-ui/core";
import style from "./style";
import { shallow } from "enzyme";
import React from "react";
import { FooterComponent } from "./footer.component";
import { render } from "@testing-library/react";

describe("<FooterComponent />", () => {
  const Component = withStyles(style)(FooterComponent);

  test("renders call SetHeight", () => {
    const SetHeight = jest.fn();
    render(<Component SetHeight={SetHeight} />);
    expect(SetHeight).toBeCalled();
  });
});
