import Button from "@material-ui/core/Button";
import React from "react";
import style from "./style";
import { withStyles, WithStyles } from "@material-ui/core/styles";
export interface PropsAppButton extends WithStyles<typeof style> {
  style?: Object;
  class?: string;
  onClick?: () => void;
  text?: string;
  color?: "inherit" | "primary" | "secondary" | "default" | undefined;
}

export class AppButton extends React.Component<PropsAppButton> {
  render() {
    const appButtonClass = [[this.props.class]];
    return (
      <Button
        variant="contained"
        color={this.props.color}
        style={this.props.style}
        onClick={this.props.onClick}
        className={appButtonClass.join(" ")}
      >
        {this.props.text}
      </Button>
    );
  }
}

export default withStyles(style)(AppButton);
