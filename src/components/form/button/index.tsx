import Button from "@material-ui/core/Button";
import React from "react";
import style from "./style";
import { withStyles, WithStyles } from "@material-ui/core/styles";
export interface IAppButtonProps extends WithStyles<typeof style> {
  style?: Object;
  class?: string;
  onClick?: () => void;
  onDoubleClick?: () => void;
  type?: "button" | "reset" | "submit" | undefined;
  text?: string;
  variant?: "text" | "outlined" | "contained" | undefined;
  color?: "inherit" | "primary" | "secondary" | "default" | undefined;
}

export class AppButton extends React.Component<IAppButtonProps> {
  render() {
    const appButtonClass = [[this.props.class]];
    return (
      <Button
        variant={this.props.variant}
        color={this.props.color}
        style={this.props.style}
        onClick={this.props.onClick}
        onDoubleClick={this.props.onDoubleClick}
        className={appButtonClass.join(" ")}
        type={this.props.type}
      >
        {this.props.text}
      </Button>
    );
  }
}
export default withStyles(style)(AppButton);
