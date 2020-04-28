import React, { useState } from "react";
import AppSelect, { ISelectItem } from "../src/components/form/select";
export const Default = () => {
  const [value, setChecked] = useState("");
  const items: ISelectItem[] = [
    { label: "Select1", value: "Select1" },
    { label: "Radio2", value: "Radio2" },
    { label: "Radio3", value: "Radio3" },
    { label: "Radio4", value: "Radio4" },
  ];
  const handleOnChange = (value) => {
    setChecked(value);
  };
  return (
    <AppSelect
      onChange={handleOnChange}
      selectItems={items}
      name={"Default"}
      label={`Select`}
      value={value}
      id="test"
    />
  );
};
export const HasEmpty = () => {
  const [value, setChecked] = useState("choose-empty");
  const items: ISelectItem[] = [
    { label: "Select1", value: "Select1" },
    { label: "Radio2", value: "Radio2" },
    { label: "Radio3", value: "Radio3" },
    { label: "Radio4", value: "Radio4" },
  ];
  const handleOnChange = (value) => {
    setChecked(value);
  };
  return (
    <AppSelect
      onChange={handleOnChange}
      selectItems={items}
      name={"Default"}
      label={`Select`}
      value={value}
      id="test"
      options={{
        emptyOption: {
          label: "---choose an option---",
          value: "choose-empty",
        },
        selectAll: {
          label: "choose all option",
          value: "choose-empty",
        },
      }}
      emptySelectOption={true}
    />
  );
};
export const HasMultiple = () => {
  const [values, setChecked] = useState<any>([]);
  const items: ISelectItem[] = [
    { label: "Select1", value: "Select1" },
    { label: "Radio2", value: "Radio2" },
    { label: "Radio3", value: "Radio3" },
    { label: "Radio4", value: "Radio4" },
  ];
  const handleOnChange = (values) => {
    setChecked(values);
  };
  return (
    <AppSelect
      onChange={handleOnChange}
      selectItems={items}
      name={"Default"}
      label={`Select`}
      value={values}
      id="test"
      options={{
        selectAll: {
          label: "Chon tat ca",
          value: "choose-all-option",
        },
        labels: {
          others: "khác",
        },
      }}
      multiple={true}
    />
  );
};

export const HasMultipleAll = () => {
  const [values, setChecked] = useState<any>([]);
  const items: ISelectItem[] = [
    { label: "Select1", value: "Select1" },
    { label: "Radio2", value: "Radio2" },
    { label: "Radio3", value: "Radio3" },
    { label: "Radio4", value: "Radio4" },
  ];
  const handleOnChange = (values) => {
    setChecked(values);
  };
  return (
    <AppSelect
      onChange={handleOnChange}
      selectItems={items}
      name={"Default"}
      label={`Select`}
      value={values}
      id="test"
      options={{
        selectAll: {
          label: "Chon tat ca",
          value: "choose-all-option",
        },
      }}
      multiple={true}
      optionSelectAll={true}
    />
  );
};
export const HasMultipleAllHasEmpty = () => {
  const [values, setChecked] = useState<any>(["choose-empty"]);
  const items: ISelectItem[] = [
    { label: "Select1", value: "Select1" },
    { label: "Radio2", value: "Radio2" },
    { label: "Radio3", value: "Radio3" },
    { label: "Radio4", value: "Radio4" },
  ];
  const handleOnChange = (values) => {
    setChecked(values);
  };
  return (
    <AppSelect
      onChange={handleOnChange}
      selectItems={items}
      name={"Default"}
      label={`Select`}
      value={values}
      id="test"
      emptySelectOption={true}
      options={{
        emptyOption: {
          label: "--Chon mot phan tu---",
          value: "choose-empty",
        },
        selectAll: {
          label: "Chon tat ca",
          value: "choose-all-option",
        },
      }}
      multiple={true}
      optionSelectAll={true}
    />
  );
};
export const HasMultipleError = () => {
  const [values, setChecked] = useState<any>([]);
  const items: ISelectItem[] = [
    { label: "Select1", value: "Select1" },
    { label: "Radio2", value: "Radio2" },
    { label: "Radio3", value: "Radio3" },
    { label: "Radio4", value: "Radio4" },
  ];
  const handleOnChange = (values) => {
    setChecked(values);
  };
  return (
    <AppSelect
      onChange={handleOnChange}
      selectItems={items}
      name={"Default"}
      label={`Select`}
      value={values}
      id="test"
      options={{
        selectAll: {
          label: "Chon tat ca",
          value: "choose-all-option",
        },
      }}
      error
      helperText={`Error roi!`}
      multiple={true}
      optionSelectAll={true}
    />
  );
};
export default { title: "Component/Form/Select" };
