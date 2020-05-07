import { withStyles } from "@material-ui/core";
import style from "./style";
import AppGroupCheckBox from ".";
import { shallow } from "enzyme";
import React from "react";
import { render } from "@testing-library/react";
describe("<AppGroupCheckBox />", () => {
  const Component = withStyles(style)(AppGroupCheckBox);
  const items = [
    {
      label: "001",
      value: "001",
    },
    {
      label: "002",
      value: "002",
    },
    {
      label: "003",
      value: "003",
    },
  ];
  const props = {
    checkItems: items,
    name: `AppGroupCheckBox`,
    helperText: "helperText",
    error: false,
    label: `AppGroupCheckBox`,
    required: false,
    style: {},
    values: ["001"],
    onChange: jest.fn(),
  };

  test("should test prop label", () => {
    const { container } = render(
      <Component checkItems={props.checkItems} label={props.label} />
    );
    const el = container.querySelector(".App-FormLabel");
    expect(el?.textContent).toBe("AppGroupCheckBox");
  });
  test("should test prop checkItems", () => {
    const { container } = render(
      <Component checkItems={props.checkItems} label={props.label} />
    );
    const el = container.querySelectorAll(".App-CheckBox");
    expect(el.length).toBe(3);
  });
  test("should test prop Error ", () => {
    const { container } = render(
      <Component
        checkItems={props.checkItems}
        label={props.label}
        error={true}
        helperText={props.helperText}
      />
    );
    const el = container.querySelector(".App-FormHelperText");
    expect(el?.textContent).toBe(`helperText`);
  });

  test("should call handleOnChange() on select", () => {
    const wrapper = shallow(<Component {...props} values={[]} />);
    const component = wrapper.dive().dive().instance();
    const event = {
      target: {
        value: "001",
      },
    };
    const expected = [
      {
        label: "001",
        value: "001",
      },
    ];
    component.handleOnChange(event, true);
    expect(props.onChange).toHaveBeenCalled();
  });

  test("should call handleOnChange() on event error", () => {
    const wrapper = shallow(<Component {...props} />);
    const component = wrapper.dive().dive().instance();
    const event = {};
    const expected: any[] = [];
    component.handleOnChange(event, false);
    expect(props.onChange).toHaveBeenCalled();
  });
  test("should call handleOnChange() on Unselect", () => {
    const wrapper = shallow(<Component {...props} />);
    const component = wrapper.dive().dive().instance();
    const event = {
      target: {
        value: "001",
      },
    };
    const expected: any[] = [];
    component.setState({
      selectItem: [
        {
          label: "001",
          value: "001",
        },
      ],
    });
    component.handleOnChange(event, false);
    expect(props.onChange).toHaveBeenCalled();
  });
});
