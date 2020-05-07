import { withStyles } from "@material-ui/core";
import style from "./style";
import AppSelect, { ISelectItem } from ".";
import { shallow } from "enzyme";
import React from "react";
import { render } from "@testing-library/react";

describe("<AppSelect />", () => {
  const Component = withStyles(style)(AppSelect);

  describe("handleOnChange", () => {
    test("should call handleOnChange() not multiple and optionSelectAll  and emptySelectOption", () => {
      const handleOnChange = jest.fn();
      const items: ISelectItem[] = [
        { label: "Select1", value: "Select1" },
        { label: "Select2", value: "Select2" },
        { label: "Select3", value: "Select3" },
        { label: "Select4", value: "Select4" },
      ];
      let wrapper = shallow(
        <Component
          selectItems={items}
          onChange={handleOnChange}
          id="DE"
          value={"100"}
        />
      );
      let component = wrapper.dive().dive().instance();
      const event = {
        target: { value: "100" },
      };
      component.handleOnChange(event);
      expect(handleOnChange).toHaveBeenCalled();
    });
    test("should call handleOnChange() not multiple and optionSelectAll  has emptySelectOption", () => {
      const handleOnChange = jest.fn();
      const items: ISelectItem[] = [
        { label: "Select1", value: "Select1" },
        { label: "Select2", value: "Select2" },
        { label: "Select3", value: "Select3" },
        { label: "Select4", value: "Select4" },
      ];
      let wrapper = shallow(
        <Component
          selectItems={items}
          onChange={handleOnChange}
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
      component.handleOnChange(event);
      expect(handleOnChange).toHaveBeenCalled();
    });
    test("should call handleOnChange() has multiple and  not optionSelectAll  has emptySelectOption", () => {
      const handleOnChange = jest.fn();
      const items: ISelectItem[] = [
        { label: "Select1", value: "Select1" },
        { label: "Select2", value: "Select2" },
        { label: "Select3", value: "Select3" },
        { label: "Select4", value: "Select4" },
      ];
      let wrapper = shallow(
        <Component
          selectItems={items}
          onChange={handleOnChange}
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
      component.handleOnChange(event);
      expect(handleOnChange).toHaveBeenCalled();
    });
    test("should call handleOnChange() has multiple and  has optionSelectAll  has emptySelectOption", () => {
      const handleOnChange = jest.fn();
      const items: ISelectItem[] = [
        { label: "Select1", value: "Select1" },
        { label: "Select2", value: "Select2" },
        { label: "Select3", value: "Select3" },
        { label: "Select4", value: "Select4" },
      ];
      let wrapper = shallow(
        <Component
          selectItems={items}
          onChange={handleOnChange}
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
      component.handleOnChange(event);
      expect(handleOnChange).toHaveBeenCalled();
    });
    test("should call handleOnChange() select an option", () => {
      const handleOnChange = jest.fn();
      const items: ISelectItem[] = [
        { label: "Select1", value: "Select1" },
        { label: "Select2", value: "Select2" },
        { label: "Select3", value: "Select3" },
        { label: "Select4", value: "Select4" },
      ];
      let wrapper = shallow(
        <Component
          selectItems={items}
          onChange={handleOnChange}
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
        target: { value: ["Select3"] },
      };
      component.handleOnChange(event);
      expect(handleOnChange).toHaveBeenCalledWith(event, ["Select3"]);
    });
    test("should call handleOnChange() select all", () => {
      const handleOnChange = jest.fn();
      const items: ISelectItem[] = [
        { label: "Select1", value: "Select1" },
        { label: "Select2", value: "Select2" },
        { label: "Select3", value: "Select3" },
        { label: "Select4", value: "Select4" },
      ];
      let wrapper = shallow(
        <Component
          selectItems={items}
          onChange={handleOnChange}
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
        target: { value: ["Select1", "Select2", "Select3", "Select4"] },
      };
      component.handleOnChange(event);
      expect(handleOnChange).toHaveBeenCalledWith(event, [
        "Select1",
        "Select2",
        "Select3",
        "Select4",
      ]);
    });
    test("should call handleOnChange() Un select all", () => {
      const handleOnChange = jest.fn();
      const items: ISelectItem[] = [
        { label: "Select1", value: "Select1" },
        { label: "Select2", value: "Select2" },
        { label: "Select3", value: "Select3" },
        { label: "Select4", value: "Select4" },
      ];
      let wrapper = shallow(
        <Component
          selectItems={items}
          onChange={handleOnChange}
          id="DE"
          multiple={true}
          value={["Select1", "Select2", "Select3", "Select4"]}
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
        target: { value: ["Select1", "Select2", "Select3"] },
      };
      component.state.values = ["choose-all", "Select1", "Select2", "Select3"];
      component.state.selectedAll = true;
      component.handleOnChange(event);
      expect(handleOnChange).toHaveBeenCalled();
    });
  });
  test("should call handleOnFocus() Un select all", () => {
    const handleOnChange = jest.fn();
    const handleOnFocus = jest.fn();
    const handleOnBlur = jest.fn();
    const items: ISelectItem[] = [
      { label: "Select1", value: "Select1" },
      { label: "Select2", value: "Select2" },
      { label: "Select3", value: "Select3" },
      { label: "Select4", value: "Select4" },
    ];
    let wrapper = shallow(
      <Component
        selectItems={items}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        id="DE"
        multiple={true}
        value={["Select1", "Select2", "Select3", "Select4"]}
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
    component.handleOnFocus(event);
    component.handleOnBlur(event);
    expect(handleOnBlur).toHaveBeenCalled();
    expect(handleOnBlur).toHaveBeenCalled();
  });
  test("should call error ", () => {
    const handleOnChange = jest.fn();
    const items: ISelectItem[] = [
      { label: "Select1", value: "Select1" },
      { label: "Select2", value: "Select2" },
      { label: "Select3", value: "Select3" },
      { label: "Select4", value: "Select4" },
    ];
    const { container } = render(
      <Component
        selectItems={items}
        onChange={handleOnChange}
        id="DE"
        multiple={true}
        value={["Select1", "Select2", "Select3", "Select4"]}
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
    const text = container.querySelector(".App-FormHelperText");
    expect(text?.textContent).toBe(`Has error appear!`);
  });
  test("should call handleRenderValue item = [] ", () => {
    const handleOnChange = jest.fn();
    const items: ISelectItem[] = [
      { label: "Select1", value: "Select1" },
      { label: "Select2", value: "Select2" },
      { label: "Select3", value: "Select3" },
      { label: "Select4", value: "Select4" },
    ];
    const wrapper = shallow(
      <Component
        selectItems={items}
        onChange={handleOnChange}
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
    const handleOnChange = jest.fn();
    const items: ISelectItem[] = [
      { label: "Select1", value: "Select1" },
      { label: "Select2", value: "Select2" },
      { label: "Select3", value: "Select3" },
      { label: "Select4", value: "Select4" },
    ];
    const wrapper = shallow(
      <Component
        selectItems={items}
        onChange={handleOnChange}
        id="DE"
        multiple={true}
        value={["Select1", "Select2", "Select3"]}
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
      "Select1",
      "Select2",
      "Select3",
      "Select4",
    ]);
    const label = shallow(data);
    expect(label.dive().text()).toBe(`Select1, Select2 ( + 1 others)`);
  });
  test("should call handleRenderValue item <= 2", () => {
    const handleOnChange = jest.fn();
    const items: ISelectItem[] = [
      { label: "Select1", value: "Select1" },
      { label: "Select2", value: "Select2" },
      { label: "Select3", value: "Select3" },
      { label: "Select4", value: "Select4" },
    ];
    const wrapper = shallow(
      <Component
        selectItems={items}
        onChange={handleOnChange}
        id="DE"
        multiple={true}
        value={["Select1", "Select2"]}
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
    const data = component.handleRenderValue(["Select1", "Select2"]);
    expect(data).toBe(`Select1, Select2`);
  });
});
