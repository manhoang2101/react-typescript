import React, { useState } from "react";
import AppGroupCheckBox from "../src/components/form/groupcheckbox";
export const Default = () => {
  const [values, setValues] = useState([]);
  const handleOnChange = (values) => {
    setValues(values);
  };
  const item = [
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
  return (
    <AppGroupCheckBox
      label={`AppGroupCheckBox`}
      onChange={handleOnChange}
      checkItems={item}
      values={values}
    />
  );
};

export const HasCheck = () => {
  const [values, setValues] = useState(["003"]);
  const handleOnChange = (values) => {
    setValues(values);
  };
  const item = [
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
  return (
    <AppGroupCheckBox
      label={`AppGroupCheckBox`}
      onChange={handleOnChange}
      checkItems={item}
      values={values}
    />
  );
};
export const Error = () => {
  const [values, setValues] = useState([]);
  const handleOnChange = (values) => {
    console.log(values);
    setValues(values);
  };
  const item = [
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
  return (
    <AppGroupCheckBox
      label={`AppGroupCheckBox`}
      onChange={handleOnChange}
      checkItems={item}
      values={values}
      error
      helperText={`Loi!`}
    />
  );
};
export default { title: "Component/Form/GroupCheckbox" };
