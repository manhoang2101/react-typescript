import React from "react";
import { WithStyles, TextField, withStyles } from "@material-ui/core";
import style from "./style";

export interface AppTextFieldProps extends WithStyles<typeof style> {
  style?: Object;
  value?: any;
  onChange?: (value: string) => void;
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
}
interface AppTextFieldState {
  onFocus: boolean;
}
class AppTextField extends React.Component<
  AppTextFieldProps,
  AppTextFieldState
> {
  state = {
    onFocus: false,
  };
  constructor(props: Readonly<AppTextFieldProps>) {
    super(props);
    this.handleChange.bind(this);
  }
  handleChange = (_event: any) => {
    const { onChange } = this.props;
    onChange && onChange(_event.target.value);
  };
  handleFocus = (_event: any) => {
    this.setState({ onFocus: true });
    const { onFocus } = this.props;
    onFocus && onFocus(_event);
  };
  handleBlur = (_event: any) => {
    this.setState({ onFocus: false });
    const { onBlur } = this.props;
    onBlur && onBlur(_event);
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
    } = this.props;
    return (
      <TextField
        defaultValue={value}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        name={name}
        style={style}
        label={label}
        variant={variant}
        disabled={disabled}
        type={type}
        error={error}
        helperText={helperText}
        id={id}
        placeholder={placeholder}
        InputLabelProps={{
          shrink:
            (placeholder || value || this.state.onFocus) && label
              ? true
              : false,
        }}
      />
    );
  }
}
export default withStyles(style)(AppTextField);
