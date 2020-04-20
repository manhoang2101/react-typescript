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
    <>
      <FormGroup row>
        <FormControlLabel
          control={
            <AppCheckBox
              checked={checked}
              onChange={handleOnChange}
              name="HasLabel"
            />
          }
          label="Secondary"
        />
      </FormGroup>
      <FormGroup row>
        <FormControlLabel
          control={
            <AppCheckBox
              checked={checked1}
              onChange={handleOnChange1}
              name="HasLabel"
            />
          }
          label="Secondary"
          labelPlacement="start"
        />
      </FormGroup>
    </>
  );
};

export default { title: "Component/Form/Checkbox" };
