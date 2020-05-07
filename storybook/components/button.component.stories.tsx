import React from "react";
import AppButton from "../../src/components/form/button";

export const Default = () => (
  <AppButton color={"default"} text="Default">
    primary
  </AppButton>
);
export const Primary = () => (
  <AppButton color={"primary"} text="Primary">
    primary
  </AppButton>
);
export const Inherit = () => (
  <AppButton color={"inherit"} text="Inherit">
    primary
  </AppButton>
);
export const Secondary = () => (
  <AppButton color={"secondary"} text="Secondary">
    primary
  </AppButton>
);

export const EventClick = () => (
  <AppButton
    color={"secondary"}
    text="Secondary"
    onClick={() => alert("onClick")}
  >
    primary
  </AppButton>
);
export const EventDoubleClick = () => (
  <AppButton
    color={"secondary"}
    text="Secondary"
    onDoubleClick={() => alert("onDoubleClick")}
  >
    primary
  </AppButton>
);
export default { title: "Components/Form/Button" };
