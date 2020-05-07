import React from "react";
import { WithStyles, TextField, withStyles } from "@material-ui/core";
import style from "./style";

export interface IAppTextFieldProps extends WithStyles<typeof style> {
  style?: Object;
  value?: any;
  onChange?: (event: any, value: string) => void;
  onClick?: (value: string) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  name?: string;
  label?: string;
  variant?: "filled" | "outlined" | "standard" | undefined;
  disabled?: boolean;
  type?: string;
  error?: boolean;
  helperText?: string;
  id?: string;
  placeholder?: string;
  inputProps?: any;
  className?: string;
}
interface AppTextFieldState {
  onFocus: boolean;
  defaultValue?: any;
}
class AppTextField extends React.Component<
  IAppTextFieldProps,
  AppTextFieldState
> {
  constructor(props: Readonly<IAppTextFieldProps>) {
    super(props);
    const { value } = this.props;
    this.state = {
      onFocus: false,
      defaultValue: value,
    };
  }
  handleOnChange = (_event: any) => {
    const { onChange } = this.props;
    const { value } = _event.target;
    onChange && onChange(_event, value);
  };
  handleOnFocus = (_event: any) => {
    this.setState({ onFocus: true });
    const { onFocus } = this.props;
    onFocus && onFocus(_event);
  };
  handleOnBlur = (_event: any) => {
    this.setState({ onFocus: false });
    const { onBlur } = this.props;
    onBlur && onBlur(_event);
  };
  handleOnClick = (_event: any) => {
    const { onClick } = this.props;
    onClick && onClick(_event);
  };
  render() {
    const {
      value,
      name,
      style,
      label,
      variant,
      disabled,
      type,
      error,
      helperText,
      id,
      placeholder,
      inputProps,
      classes,
      className,
    } = this.props;
    const { defaultValue } = this.state;
    const appTextFieldClass = [className, classes.AppTextField];
    return (
      <TextField
        className={appTextFieldClass.join(" ")}
        onClick={this.handleOnClick}
        defaultValue={defaultValue}
        onChange={this.handleOnChange}
        onFocus={this.handleOnFocus}
        onBlur={this.handleOnBlur}
        name={name}
        style={style}
        label={label}
        variant={variant}
        disabled={disabled}
        type={type}
        error={!!error}
        helperText={!!error && helperText}
        id={id}
        placeholder={placeholder}
        InputLabelProps={{
          shrink:
            (placeholder || value || this.state.onFocus) && label
              ? true
              : false,
        }}
        InputProps={{ ...inputProps }}
      />
    );
  }
}
export default withStyles(style)(AppTextField);
