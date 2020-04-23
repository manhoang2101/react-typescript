import { withStyles } from "@material-ui/core";
import style from "./style";
import AppSelect, { ISelectItem } from ".";
import { shallow } from "enzyme";
import React from "react";
import { render } from "@testing-library/react";

describe("<AppSelect />", () => {
  const Component = withStyles(style)(AppSelect);
  test("toMatchSnapshot()", () => {
    const items: ISelectItem[] = [
      { label: "Radio1", value: "Radio1" },
      { label: "Radio2", value: "Radio2" },
      { label: "Radio3", value: "Radio3" },
      { label: "Radio4", value: "Radio4" },
    ];
    const container = shallow(<Component selectItems={items} id="DE" />);
    expect(container).toMatchSnapshot();
  });
  describe("handleChange", () => {
    test("should call handleChange() not multiple and optionSelectAll  and emptySelectOption", () => {
      const handleChange = jest.fn();
      const items: ISelectItem[] = [
        { label: "Radio1", value: "Radio1" },
        { label: "Radio2", value: "Radio2" },
        { label: "Radio3", value: "Radio3" },
        { label: "Radio4", value: "Radio4" },
      ];
      let wrapper = shallow(
        <Component
          selectItems={items}
          onChange={handleChange}
          id="DE"
          value={"100"}
        />
      );
      let component = wrapper.dive().dive().instance();
      const event = {
        target: { value: "100" },
      };
      component.handleChange(event);
      expect(handleChange).toHaveBeenCalled();
    });
    test("should call handleChange() not multiple and optionSelectAll  has emptySelectOption", () => {
      const handleChange = jest.fn();
      const items: ISelectItem[] = [
        { label: "Radio1", value: "Radio1" },
        { label: "Radio2", value: "Radio2" },
        { label: "Radio3", value: "Radio3" },
        { label: "Radio4", value: "Radio4" },
      ];
      let wrapper = shallow(
        <Component
          selectItems={items}
          onChange={handleChange}
          id="DE"
          emptySelectOption
          value={""}
        />
      );
      let component = wrapper.dive().dive().instance();
      expect(component.props.emptySelectOption).toBe(true);
      const event = {
        target: { value: ["1", "2", "3"] },
      };
      component.handleChange(event);
      expect(handleChange).toHaveBeenCalled();
    });
    test("should call handleChange() has multiple and  not optionSelectAll  has emptySelectOption", () => {
      const handleChange = jest.fn();
      const items: ISelectItem[] = [
        { label: "Radio1", value: "Radio1" },
        { label: "Radio2", value: "Radio2" },
        { label: "Radio3", value: "Radio3" },
        { label: "Radio4", value: "Radio4" },
      ];
      let wrapper = shallow(
        <Component
          selectItems={items}
          onChange={handleChange}
          id="DE"
          emptySelectOption
          multiple
          value={["1"]}
          options={{
            emptyOption: {
              label: "-- Choose a option --",
              value: "choose-empty",
            },
            selectAll: {
              label: "Choose All",
              value: "choose-all",
            },
            labels: {
              others: "others",
            },
          }}
        />
      );
      let component = wrapper.dive().dive().instance();
      expect(component.props.emptySelectOption).toBe(true);
      expect(component.props.multiple).toBe(true);
      const event = {
        target: { value: [] },
      };
      component.handleChange(event);
      expect(handleChange).toHaveBeenCalled();
    });
    test("should call handleChange() has multiple and  has optionSelectAll  has emptySelectOption", () => {
      const handleChange = jest.fn();
      const items: ISelectItem[] = [
        { label: "Radio1", value: "Radio1" },
        { label: "Radio2", value: "Radio2" },
        { label: "Radio3", value: "Radio3" },
        { label: "Radio4", value: "Radio4" },
      ];
      let wrapper = shallow(
        <Component
          selectItems={items}
          onChange={handleChange}
          id="DE"
          emptySelectOption={true}
          multiple={true}
          value={["1"]}
          options={{
            emptyOption: {
              label: "-- Choose a option --",
              value: "choose-empty",
            },
            selectAll: {
              label: "Choose All",
              value: "choose-all",
            },
            labels: {
              others: "others",
            },
          }}
          optionSelectAll={true}
        />
      );
      let component = wrapper.dive().dive().instance();
      expect(component.props.emptySelectOption).toBe(true);
      expect(component.props.multiple).toBe(true);
      expect(component.props.optionSelectAll).toBe(true);
      const event = {
        target: { value: [] },
      };
      component.handleChange(event);
      expect(handleChange).toHaveBeenCalled();
    });
    test("should call handleChange() select an option", () => {
      const handleChange = jest.fn();
      const items: ISelectItem[] = [
        { label: "Radio1", value: "Radio1" },
        { label: "Radio2", value: "Radio2" },
        { label: "Radio3", value: "Radio3" },
        { label: "Radio4", value: "Radio4" },
      ];
      let wrapper = shallow(
        <Component
          selectItems={items}
          onChange={handleChange}
          id="DE"
          emptySelectOption={true}
          multiple={true}
          value={[]}
          options={{
            emptyOption: {
              label: "-- Choose a option --",
              value: "choose-empty",
            },
            selectAll: {
              label: "Choose All",
              value: "choose-all",
            },
            labels: {
              others: "others",
            },
          }}
          optionSelectAll={true}
        />
      );
      let component = wrapper.dive().dive().instance();
      const event = {
        target: { value: ["Radio3"] },
      };
      component.handleChange(event);
      expect(handleChange).toHaveBeenCalledWith(["Radio3"]);
    });
    test("should call handleChange() select all", () => {
      const handleChange = jest.fn();
      const items: ISelectItem[] = [
        { label: "Radio1", value: "Radio1" },
        { label: "Radio2", value: "Radio2" },
        { label: "Radio3", value: "Radio3" },
        { label: "Radio4", value: "Radio4" },
      ];
      let wrapper = shallow(
        <Component
          selectItems={items}
          onChange={handleChange}
          id="DE"
          emptySelectOption={true}
          multiple={true}
          value={[]}
          options={{
            emptyOption: {
              label: "-- Choose a option --",
              value: "choose-empty",
            },
            selectAll: {
              label: "Choose All",
              value: "choose-all",
            },
            labels: {
              others: "others",
            },
          }}
          optionSelectAll={true}
        />
      );
      let component = wrapper.dive().dive().instance();
      const event = {
        target: { value: ["Radio1", "Radio2", "Radio3", "Radio4"] },
      };
      component.handleChange(event);
      expect(handleChange).toHaveBeenCalledWith([
        "Radio1",
        "Radio2",
        "Radio3",
        "Radio4",
      ]);
    });
    test("should call handleChange() Un select all", () => {
      const handleChange = jest.fn();
      const items: ISelectItem[] = [
        { label: "Radio1", value: "Radio1" },
        { label: "Radio2", value: "Radio2" },
        { label: "Radio3", value: "Radio3" },
        { label: "Radio4", value: "Radio4" },
      ];
      let wrapper = shallow(
        <Component
          selectItems={items}
          onChange={handleChange}
          id="DE"
          multiple={true}
          value={["Radio1", "Radio2", "Radio3", "Radio4"]}
          options={{
            emptyOption: {
              label: "-- Choose a option --",
              value: "choose-empty",
            },
            selectAll: {
              label: "Choose All",
              value: "choose-all",
            },
            labels: {
              others: "others",
            },
          }}
          optionSelectAll={true}
        />
      );
      let component = wrapper.dive().dive().instance();
      const event = {
        target: { value: ["Radio1", "Radio2", "Radio3"] },
      };
      component.state.values = ["choose-all", "Radio1", "Radio2", "Radio3"];
      component.state.selectedAll = true;
      component.handleChange(event);
      expect(handleChange).toHaveBeenCalledWith([]);
    });
  });
  test("should call handleFocus() Un select all", () => {
    const handleChange = jest.fn();
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    const items: ISelectItem[] = [
      { label: "Radio1", value: "Radio1" },
      { label: "Radio2", value: "Radio2" },
      { label: "Radio3", value: "Radio3" },
      { label: "Radio4", value: "Radio4" },
    ];
    let wrapper = shallow(
      <Component
        selectItems={items}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        id="DE"
        multiple={true}
        value={["Radio1", "Radio2", "Radio3", "Radio4"]}
        options={{
          emptyOption: {
            label: "-- Choose a option --",
            value: "choose-empty",
          },
          selectAll: {
            label: "Choose All",
            value: "choose-all",
          },
          labels: {
            others: "others",
          },
        }}
        optionSelectAll={true}
      />
    );
    let component = wrapper.dive().dive().instance();
    const event: React.ChangeEvent<{}> = {};
    component.handleFocus(event);
    component.handleBlur(event);
    expect(handleBlur).toHaveBeenCalledWith(event);
    expect(handleBlur).toHaveBeenCalledWith(event);
  });
  test("should call error ", () => {
    const handleChange = jest.fn();
    const items: ISelectItem[] = [
      { label: "Radio1", value: "Radio1" },
      { label: "Radio2", value: "Radio2" },
      { label: "Radio3", value: "Radio3" },
      { label: "Radio4", value: "Radio4" },
    ];
    const { container } = render(
      <Component
        selectItems={items}
        onChange={handleChange}
        id="DE"
        multiple={true}
        value={["Radio1", "Radio2", "Radio3", "Radio4"]}
        options={{
          emptyOption: {
            label: "-- Choose a option --",
            value: "choose-empty",
          },
          selectAll: {
            label: "Choose All",
            value: "choose-all",
          },
          labels: {
            others: "others",
          },
        }}
        optionSelectAll={true}
        error={true}
        helperText={`Has error appear!`}
      />
    );
    const text = container.querySelector(".data-test-FormHelperText");
    expect(text?.textContent).toBe(`Has error appear!`);
  });
  test("should call handleRenderValue item = [] ", () => {
    const handleChange = jest.fn();
    const items: ISelectItem[] = [
      { label: "Radio1", value: "Radio1" },
      { label: "Radio2", value: "Radio2" },
      { label: "Radio3", value: "Radio3" },
      { label: "Radio4", value: "Radio4" },
    ];
    const wrapper = shallow(
      <Component
        selectItems={items}
        onChange={handleChange}
        id="DE"
        multiple={true}
        value={[]}
        optionSelectAll={true}
        emptySelectOption={true}
        options={{
          emptyOption: {
            label: "-- Choose a option --",
            value: "choose-empty",
          },
          selectAll: {
            label: "Choose All",
            value: "choose-all",
          },
          labels: {
            others: "others",
          },
        }}
      />
    );
    const component = wrapper.dive().dive().instance();
    const data = component.handleRenderValue([]);
    expect(data).toBe(`-- Choose a option --`);
  });
  test("should call handleRenderValue item > 2", () => {
    const handleChange = jest.fn();
    const items: ISelectItem[] = [
      { label: "Radio1", value: "Radio1" },
      { label: "Radio2", value: "Radio2" },
      { label: "Radio3", value: "Radio3" },
      { label: "Radio4", value: "Radio4" },
    ];
    const wrapper = shallow(
      <Component
        selectItems={items}
        onChange={handleChange}
        id="DE"
        multiple={true}
        value={["Radio1", "Radio2", "Radio3"]}
        optionSelectAll={true}
        emptySelectOption={true}
        options={{
          emptyOption: {
            label: "-- Choose a option --",
            value: "choose-empty",
          },
          selectAll: {
            label: "Choose All",
            value: "choose-all",
          },
          labels: {
            others: "others",
          },
        }}
      />
    );
    const component = wrapper.dive().dive().instance();
    const data = component.handleRenderValue([
      "Radio1",
      "Radio2",
      "Radio3",
      "Radio4",
    ]);
    const label = shallow(data);
    expect(label.dive().text()).toBe(`Radio1, Radio2 ( + 1 others)`);
  });
  test("should call handleRenderValue item <= 2", () => {
    const handleChange = jest.fn();
    const items: ISelectItem[] = [
      { label: "Radio1", value: "Radio1" },
      { label: "Radio2", value: "Radio2" },
      { label: "Radio3", value: "Radio3" },
      { label: "Radio4", value: "Radio4" },
    ];
    const wrapper = shallow(
      <Component
        selectItems={items}
        onChange={handleChange}
        id="DE"
        multiple={true}
        value={["Radio1", "Radio2"]}
        optionSelectAll={true}
        emptySelectOption={true}
        options={{
          emptyOption: {
            label: "-- Choose a option --",
            value: "choose-empty",
          },
          selectAll: {
            label: "Choose All",
            value: "choose-all",
          },
          labels: {
            others: "others",
          },
        }}
      />
    );
    const component = wrapper.dive().dive().instance();
    const data = component.handleRenderValue(["Radio1", "Radio2"]);
    expect(data).toBe(`Radio1, Radio2`);
  });
  // test("should call handleBlur()", () => {
  //   const handleBlur = jest.fn();
  //   let wrapper = shallow(<Component onBlur={handleBlur} />);
  //   let component = wrapper.dive().dive().instance();
  //   component.handleBlur(null);
  //   expect(handleBlur).toHaveBeenCalled();
  // });
});
