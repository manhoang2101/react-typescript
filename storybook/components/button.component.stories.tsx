import React from "react";
import AppButton from "../../src/components/form/button";

export const Default = () => (
  <AppButton
    type="button"
    variant="contained"
    color={"default"}
    text="Default"
  ></AppButton>
);
export const Primary = () => (
  <AppButton
    type="button"
    variant="contained"
    color={"primary"}
    text="Primary"
  ></AppButton>
);
export const Inherit = () => (
  <AppButton
    type="button"
    variant="contained"
    color={"inherit"}
    text="Inherit"
  ></AppButton>
);
export const Secondary = () => (
  <AppButton
    type="button"
    variant="contained"
    color={"secondary"}
    text="Secondary"
  ></AppButton>
);

export const EventClick = () => (
  <AppButton
    type="button"
    variant="contained"
    color={"secondary"}
    text="Secondary"
    onClick={() => alert("onClick")}
  ></AppButton>
);
export const EventDoubleClick = () => (
  <AppButton
    type="button"
    variant="contained"
    color={"secondary"}
    text="Secondary"
    onDoubleClick={() => alert("onDoubleClick")}
  ></AppButton>
);
export default { title: "Components/Form/Button" };
