import React, { useState } from "react";
import AppCheckBox from "../src/components/form/checkbox";
import { FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";
export const Default = () => {
  const [checked, setChecked] = useState(false);
  const handleOnChange = (checked) => {
    setChecked(checked);
  };
  return <AppCheckBox checked={checked} onChange={handleOnChange} />;
};

export const HasLabel = () => {
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const handleOnChange = (checked) => {
    setChecked(checked);
  };
  const handleOnChange1 = (checked) => {
    setChecked1(checked);
  };
  return (
    <AppCheckBox
      checked={checked}
      onChange={handleOnChange}
      name="HasLabel"
      label={`AppCheckBox`}
    />
  );
};
export const HasError = () => {
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const handleOnChange = (checked) => {
    setChecked(checked);
  };
  const handleOnChange1 = (checked) => {
    setChecked1(checked);
  };
  return (
    <AppCheckBox
      checked={checked}
      onChange={handleOnChange}
      name="HasLabel"
      error
      helperText={`Error!`}
      label={`AppCheckBox`}
    />
  );
};
export default { title: "Component/Form/Checkbox" };
