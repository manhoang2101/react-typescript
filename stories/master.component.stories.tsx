import React from "react";
import MasterContainer from "../src/containers/master";
import { withStyles, jssPreset } from "@material-ui/core";
import styles from "../src/untils/styles";
const Component = withStyles(styles)(MasterContainer);
export const Master = () => {
  return (
    <Component config={{}} fetchConfigAction={() => {}} pageLoadding={false} />
  );
};

export default { title: "Container/Master" };
