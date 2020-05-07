import Button from "@material-ui/core/Button";
import React from "react";
import style from "./style";
import { withStyles, WithStyles } from "@material-ui/core/styles";
export interface IAppButtonProps extends WithStyles<typeof style> {
  style?: Object;
  className?: string;
  onClick?: () => void;
  onDoubleClick?: () => void;
  type?: "button" | "reset" | "submit" | undefined;
  text?: string;
  variant?: "text" | "outlined" | "contained" | undefined;
  color?: "inherit" | "primary" | "secondary" | "default" | undefined;
  fullWidth?: boolean;
}

export class AppButton extends React.Component<IAppButtonProps> {
  render() {
    const appButtonClass = ["App-Button", this.props.className];
    return (
      <Button
        variant={this.props.variant}
        color={this.props.color}
        style={this.props.style}
        onClick={this.props.onClick}
        onDoubleClick={this.props.onDoubleClick}
        className={appButtonClass.join(" ")}
        type={this.props.type}
        fullWidth={this.props.fullWidth}
      >
        {this.props.text}
      </Button>
    );
  }
}
export default withStyles(style)(AppButton);
