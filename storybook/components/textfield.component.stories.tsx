import React, { useState } from "react";
import AppTextField from "../../src/components/form/textfield";
export const Default = () => {
  const [value, setChecked] = useState("Default");
  const handleOnChange = (value) => {
    setChecked(value);
  };
  return <AppTextField onChange={handleOnChange} />;
};
export const HasDefaultValue = () => {
  const [value, setChecked] = useState("Default");
  const handleOnChange = (value) => {
    setChecked(value);
  };
  return <AppTextField value={value} onChange={handleOnChange} />;
};
export const HasLabel = () => {
  const [value, setChecked] = useState("");
  const handleOnChange = (value) => {
    setChecked(value);
  };
  return (
    <AppTextField value={value} label="Default" onChange={handleOnChange} />
  );
};
export const HasVariant = () => {
  const [value, setChecked] = useState("");
  const handleOnChange = (value) => {
    setChecked(value);
  };
  return (
    <AppTextField
      style={{
        marginTop: 10,
      }}
      value={value}
      variant={`outlined`}
      onChange={handleOnChange}
      label="Default"
    />
  );
};
export const HasVariantPlaceholder = () => {
  const [value, setChecked] = useState("");
  const handleOnChange = (value) => {
    setChecked(value);
  };
  return (
    <AppTextField
      style={{
        marginTop: 10,
      }}
      variant={`outlined`}
      onChange={handleOnChange}
      label="Default"
      value="Default"
      placeholder="Placeholder"
    />
  );
};
export const HasTypePassword = () => {
  const [value, setChecked] = useState("");
  const handleOnChange = (value) => {
    setChecked(value);
  };
  return (
    <AppTextField
      style={{
        marginTop: 10,
      }}
      value={value}
      variant={`outlined`}
      onChange={handleOnChange}
      label="Password*"
      type={"password"}
    />
  );
};
export const HasTypeFile = () => {
  const [value, setChecked] = useState("vd");
  const handleOnChange = (value) => {
    setChecked(value);
  };
  return (
    <AppTextField
      style={{
        marginTop: 10,
      }}
      variant={`outlined`}
      onChange={handleOnChange}
      label="Upload file*"
      type={"file"}
    />
  );
};

export const HasVariantError = () => {
  const [value, setChecked] = useState("");
  const handleOnChange = (value) => {
    setChecked(value);
  };
  return (
    <AppTextField
      style={{
        marginTop: 10,
      }}
      variant={`outlined`}
      onChange={handleOnChange}
      label="Default"
      value="Default"
      placeholder="Placeholder"
      error
      helperText={`Loi roi!`}
    />
  );
};
export default { title: "Components/Form/TextField" };
