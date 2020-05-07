import React, { useState } from "react";
import AppRadio, { IRadioItem } from "../../src/components/form/radio";
export const Default = () => {
  const [value, setChecked] = useState("Radio4");
  const items: IRadioItem[] = [
    { label: "Radio1", value: "Radio1", color: "primary" },
    { label: "Radio2", value: "Radio2" },
    { label: "Radio3", value: "Radio3" },
    { label: "Radio4", value: "Radio4" },
  ];
  const handleOnChange = (event) => {
    const { value } = event.target;
    setChecked(value);
  };
  return (
    <AppRadio
      onChange={handleOnChange}
      radioItems={items}
      name={"Default"}
      label={`Group Radio`}
      value={value}
    />
  );
};
export const HasError = () => {
  const [value, setChecked] = useState("Radio4");
  const items: IRadioItem[] = [
    { label: "Radio1", value: "Radio1", color: "primary" },
    { label: "Radio2", value: "Radio2" },
    { label: "Radio3", value: "Radio3" },
    { label: "Radio4", value: "Radio4" },
  ];
  const handleOnChange = (event) => {
    const { value } = event.target;
    setChecked(value);
  };
  return (
    <AppRadio
      onChange={handleOnChange}
      radioItems={items}
      name={"Default"}
      label={`Group Radio`}
      value={value}
      error
      helperText={`Loi!`}
    />
  );
};
export default { title: "Components/Form/Radio" };
