import React from "react";
import {
  WithStyles,
  Checkbox,
  withStyles,
  FormControlLabel,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import style from "./style";

export interface IAppCheckBoxProps extends WithStyles<typeof style> {
  style?: Object;
  checked?: boolean;
  label?: string;
  value?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    selected?: boolean
  ) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  helperText?: string;
  error?: boolean;
  isGroup?: boolean;
  required?: boolean;
  key?: string | number;
  className?: string;
  color?: "primary" | "secondary" | "default" | undefined;
}
class AppCheckBox extends React.Component<IAppCheckBoxProps> {
  handleOnChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const { onChange } = this.props;
    onChange && onChange(_event, checked);
  };
  render() {
    const {
      checked,
      name,
      style,
      label,
      value,
      error,
      isGroup,
      helperText,
      required,
      key,
      className,
      color,
    } = this.props;
    const appCheckBoxClass = ["App-CheckBox", className];
    return (
      (isGroup && (
        <FormControlLabel
          className={`App-FormControlLabel`}
          control={
            <Checkbox
              key={key}
              id={`${name}-${key}`}
              className={appCheckBoxClass.join(" ")}
              checked={checked}
              onChange={this.handleOnChange}
              name={`${name}-${key}`}
              value={value}
              style={style}
              color={color}
            />
          }
          label={label}
        />
      )) || (
        <FormControl error={!!error} required={required}>
          <FormControlLabel
            control={
              <Checkbox
                className={appCheckBoxClass.join(" ")}
                checked={checked}
                onChange={this.handleOnChange}
                name={name}
                value={value}
                style={style}
                color={color}
              />
            }
            label={label}
          />
          {!!error && (
            <FormHelperText error={!!error} className={`App-FormHelperText`}>
              {helperText}
            </FormHelperText>
          )}
        </FormControl>
      )
    );
  }
}

export default withStyles(style)(AppCheckBox);
