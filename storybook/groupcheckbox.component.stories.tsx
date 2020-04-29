import React, { useState } from "react";
import AppGroupCheckBox from "../src/components/form/groupcheckbox";
import { FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";
export const Default = () => {
  const [checked, setChecked] = useState(false);
  const handleOnChange = (checked) => {
    setChecked(checked);
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
      checked={checked}
      onChange={handleOnChange}
      checkItems={item}
    />
  );
};
export const Error = () => {
  const [checked, setChecked] = useState(false);
  const handleOnChange = (checked) => {
    setChecked(checked);
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
      checked={checked}
      error
      helperText={`Loi!`}
      onChange={handleOnChange}
      checkItems={item}
    />
  );
};
export default { title: "Component/Form/GroupCheckbox" };
