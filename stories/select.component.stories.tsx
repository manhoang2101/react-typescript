import React, { useState } from "react";
import AppSelect, { ISelectItem } from "../src/components/form/select";
export const Default = () => {
  const [value, setChecked] = useState("");
  const items: ISelectItem[] = [
    { label: "Radio1", value: "Radio1" },
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
      id="sdfsdfd-d"
    />
  );
};
export const HasEmty = () => {
  const [value, setChecked] = useState("choose-emty");
  const items: ISelectItem[] = [
    { label: "Radio1", value: "Radio1" },
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
      id="sdfsdfd-d"
      options={{
        emtyOption: {
          label: "---chon mot phan tu---",
          value: "choose-emty",
        },
        selectAll: {
          label: "choose all option",
          value: "choose-emty",
        },
      }}
      emtySelectOption={true}
    />
  );
};
export const HasMultiple = () => {
  const [values, setChecked] = useState<any>([]);
  const items: ISelectItem[] = [
    { label: "Radio1", value: "Radio1" },
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
      id="sdfsdfd-d"
      options={{
        selectAll: {
          label: "Chon tat ca",
          value: "choose-all-option",
        },
        lables: {
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
    { label: "Radio1", value: "Radio1" },
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
      id="sdfsdfd-d"
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
export const HasMultipleAllHasEmty = () => {
  const [values, setChecked] = useState<any>(["choose-emty"]);
  const items: ISelectItem[] = [
    { label: "Radio1", value: "Radio1" },
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
      id="sdfsdfd-d"
      emtySelectOption={true}
      options={{
        emtyOption: {
          label: "---chon mot phan tu---",
          value: "choose-emty",
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
    { label: "Radio1", value: "Radio1" },
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
      id="sdfsdfd-d"
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
