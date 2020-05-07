import { withStyles } from "@material-ui/core";
import style from "./style";
import AppAutocomplete, { IOption } from ".";
import { shallow } from "enzyme";
import React from "react";
import { render } from "@testing-library/react";
import { of } from "rxjs";
global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: "BODY",
    ownerDocument: document,
  },
});
describe("<AppAutocomplete />", () => {
  const Component = withStyles(style)(AppAutocomplete);
  test("should show label", () => {
    const items: IOption[] = [
      { label: "Select1", value: "Select1" },
      { label: "Select2", value: "Select2" },
      { label: "Select3", value: "Select3" },
      { label: "Select4", value: "Select4" },
    ];
    const input = "LABEL";
    const { container } = render(<Component options={items} label={input} />);
    const el = container.querySelector(".App-TextField label");
    expect(el?.textContent).toBe("LABEL");
  });
  test("should default open true and loading true", () => {
    const items: IOption[] = [
      { label: "Select1", value: "Select1" },
      { label: "Select2", value: "Select2" },
      { label: "Select3", value: "Select3" },
      { label: "Select4", value: "Select4" },
    ];
    const input = "LABEL";
    const wrapper = shallow(
      <Component options={items} label={input} open={true} loading={true} />
    );
    const component = wrapper.dive().dive().instance();
    expect(component.props.open).toBe(true);
    expect(component.props.loading).toBe(true);
  });
  test("should async show TextField", () => {
    const items: IOption[] = [
      { label: "Select1", value: "Select1" },
      { label: "Select2", value: "Select2" },
      { label: "Select3", value: "Select3" },
      { label: "Select4", value: "Select4" },
    ];
    const input = "LABEL";
    const { container } = render(
      <Component options={items} label={input} async />
    );
    const el = container.querySelectorAll(".App-TextField.Async");
    expect(el.length).toBe(1);
  });
  test("should has prop renderTextField", () => {
    const items: IOption[] = [
      { label: "Select1", value: "Select1" },
      { label: "Select2", value: "Select2" },
      { label: "Select3", value: "Select3" },
      { label: "Select4", value: "Select4" },
    ];
    const input = "LABEL";
    const renderTextField = jest.fn();
    render(
      <Component
        options={items}
        label={input}
        renderTextField={renderTextField}
      />
    );
    expect(renderTextField).toHaveBeenCalled();
  });
  test("should has prop renderTags", () => {
    const items: IOption[] = [
      { label: "Select1", value: "Select1" },
      { label: "Select2", value: "Select2" },
      { label: "Select3", value: "Select3" },
      { label: "Select4", value: "Select4" },
    ];
    const input = "LABEL";
    const option: IOption[] = [{ label: "Select1", value: "Select1" }];
    const renderTags = jest.fn();
    const { container } = render(
      <Component
        options={items}
        label={input}
        multiple
        option={option}
        renderTags={renderTags}
      />
    );

    const el = container.querySelectorAll(".App-Chip");
    expect(el.length).toBe(1);
  });
  test("should has prop getOptionLabel and renderOption", () => {
    const items: IOption[] = [
      { label: "Select1", value: "Select1" },
      { label: "Select2", value: "Select2" },
      { label: "Select3", value: "Select3" },
      { label: "Select4", value: "Select4" },
    ];
    const input = "LABEL";
    const getOptionLabel = jest.fn();
    render(
      <Component
        options={items}
        label={input}
        option={{ label: "Select1", value: "Select1" }}
        getOptionLabel={getOptionLabel}
      />
    );
    expect(getOptionLabel).toHaveBeenCalled();
  });
  test("should has prop renderOption ", () => {
    const items: IOption[] = [
      { label: "Select1", value: "Select1" },
      { label: "Select2", value: "Select2" },
      { label: "Select3", value: "Select3" },
      { label: "Select4", value: "Select4" },
    ];
    const input = "LABEL";
    const renderOption = jest.fn();
    render(
      <Component
        options={items}
        label={input}
        option={{ label: "Select1", value: "Select1" }}
        renderOption={renderOption}
        open={true}
      />
    );
    expect(renderOption).toHaveBeenCalled();
  });
  test("should has not prop renderOption ", () => {
    const items: IOption[] = [
      { label: "Select1", value: "Select1" },
      { label: "Select2", value: "Select2" },
      { label: "Select3", value: "Select3" },
      { label: "Select4", value: "Select4" },
    ];
    const input = "LABEL";
    const renderOption = jest.fn();
    render(
      <Component
        options={items}
        multiple={true}
        label={input}
        option={[{ label: "Select1", value: "Select1" }]}
        open={true}
      />
    );
    expect(renderOption).not.toHaveBeenCalled();
  });
  describe("should show all function handle", () => {
    test("should has prop getOptionSelected ", () => {
      const items: IOption[] = [
        { label: "Select1", value: "Select1" },
        { label: "Select2", value: "Select2" },
        { label: "Select3", value: "Select3" },
        { label: "Select4", value: "Select4" },
      ];
      const input = "LABEL";
      const getOptionSelected = jest.fn();
      render(
        <Component
          options={items}
          label={input}
          multiple
          option={[{ label: "Select1", value: "Select1" }]}
          getOptionSelected={getOptionSelected}
          open={true}
        />
      );
      expect(getOptionSelected).toHaveBeenCalled();
    });
    test("should has prop getOptionSelected not set option ", () => {
      const items: IOption[] = [
        { label: "Select1", value: "Select1" },
        { label: "Select2", value: "Select2" },
        { label: "Select3", value: "Select3" },
        { label: "Select4", value: "Select4" },
      ];
      const input = "LABEL";
      const getOptionSelected = jest.fn();
      render(
        <Component
          options={items}
          label={input}
          multiple
          getOptionSelected={getOptionSelected}
          option={undefined}
          open={true}
        />
      );
      expect(getOptionSelected).not.toHaveBeenCalled();
    });
    test("should handleOnChangeInput ", () => {
      const items: IOption[] = [
        { label: "Select1", value: "Select1" },
        { label: "Select2", value: "Select2" },
        { label: "Select3", value: "Select3" },
        { label: "Select4", value: "Select4" },
      ];
      const input = "LABEL";
      const onChangeInput = jest.fn().mockReturnValue(of(true));
      const wrapper = shallow(
        <Component
          options={items}
          label={input}
          multiple
          option={[{ label: "Select1", value: "Select1" }]}
          onChangeInput={onChangeInput}
        />
      );
      let component = wrapper.dive().dive().instance();
      const event = {
        target: {
          value: "TEST",
        },
      };
      component.handleOnChangeInput(event);
      expect(onChangeInput).toHaveBeenCalledWith("TEST", event);
    });
    test("should handleOnChangeInput has minLengthCallChangeInput", () => {
      const items: IOption[] = [
        { label: "Select1", value: "Select1" },
        { label: "Select2", value: "Select2" },
        { label: "Select3", value: "Select3" },
        { label: "Select4", value: "Select4" },
      ];
      const input = "LABEL";
      const onChangeInput = jest.fn().mockReturnValue(of(true));
      const wrapper = shallow(
        <Component
          options={items}
          label={input}
          multiple
          option={[{ label: "Select1", value: "Select1" }]}
          onChangeInput={onChangeInput}
          minLengthCallChangeInput={2}
        />
      );
      let component = wrapper.dive().dive().instance();
      const event = {
        target: {
          value: "T",
        },
      };
      component.handleOnChangeInput(event);
      expect(onChangeInput).not.toHaveBeenCalledWith("TEST", event);
      expect(component.props.minLengthCallChangeInput).toBe(2);
    });
    test("should handleOnChangeOption ", () => {
      const items: IOption[] = [
        { label: "Select1", value: "Select1" },
        { label: "Select2", value: "Select2" },
        { label: "Select3", value: "Select3" },
        { label: "Select4", value: "Select4" },
      ];
      const input = "LABEL";
      const onChangeOption = jest.fn();
      const wrapper = shallow(
        <Component
          options={items}
          label={input}
          multiple
          option={[]}
          onChangeOption={onChangeOption}
        />
      );
      let component = wrapper.dive().dive().instance();
      const event = {
        target: {
          value: "TEST",
        },
      };
      const value = { label: "Select1", value: "Select1" };
      component.handleOnChangeOption(event, value);
      expect(onChangeOption).toHaveBeenCalled();
    });
    test("should handleOpen has prop onOpen ", () => {
      const items: IOption[] = [
        { label: "Select1", value: "Select1" },
        { label: "Select2", value: "Select2" },
        { label: "Select3", value: "Select3" },
        { label: "Select4", value: "Select4" },
      ];
      const input = "LABEL";
      const onOpen = jest.fn();
      const wrapper = shallow(
        <Component
          options={items}
          label={input}
          multiple
          option={[]}
          onOpen={onOpen}
        />
      );
      let component = wrapper.dive().dive().instance();
      component.handleOpen();
      expect(component.state.open).toBe(true);
      expect(onOpen).toHaveBeenCalledWith();
    });
    test("should handleOpen not prop onOpen ", () => {
      const items: IOption[] = [
        { label: "Select1", value: "Select1" },
        { label: "Select2", value: "Select2" },
        { label: "Select3", value: "Select3" },
        { label: "Select4", value: "Select4" },
      ];
      const input = "LABEL";
      const onOpen = jest.fn();
      const wrapper = shallow(
        <Component options={items} label={input} multiple option={[]} />
      );
      let component = wrapper.dive().dive().instance();
      component.handleOpen();
      expect(onOpen).not.toHaveBeenCalled();
    });
    test("should handleClose has prop onClose ", () => {
      const items: IOption[] = [
        { label: "Select1", value: "Select1" },
        { label: "Select2", value: "Select2" },
        { label: "Select3", value: "Select3" },
        { label: "Select4", value: "Select4" },
      ];
      const input = "LABEL";
      const onClose = jest.fn();
      const wrapper = shallow(
        <Component
          options={items}
          label={input}
          multiple
          option={[]}
          onClose={onClose}
        />
      );
      let component = wrapper.dive().dive().instance();
      component.handleClose();
      expect(component.state.open).toBe(false);
      expect(onClose).toHaveBeenCalledWith();
    });
    test("should handleClose not prop onClose ", () => {
      const items: IOption[] = [
        { label: "Select1", value: "Select1" },
        { label: "Select2", value: "Select2" },
        { label: "Select3", value: "Select3" },
        { label: "Select4", value: "Select4" },
      ];
      const input = "LABEL";
      const onClose = jest.fn();
      const wrapper = shallow(
        <Component options={items} label={input} multiple option={[]} />
      );
      let component = wrapper.dive().dive().instance();
      component.handleClose();
      expect(onClose).not.toHaveBeenCalled();
    });
  });
});
