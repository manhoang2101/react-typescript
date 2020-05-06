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
  name?: string;
  helperText?: string;
  error?: boolean;
  isGroup?: boolean;
}
class AppCheckBox extends React.Component<IAppCheckBoxProps> {
  constructor(props: Readonly<IAppCheckBoxProps>) {
    super(props);
  }
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
    } = this.props;
    return (
      (isGroup && (
        <FormControlLabel
          className={`App-FormControlLabel`}
          control={
            <Checkbox
              className={`App-Checkbox`}
              checked={checked}
              onChange={this.handleOnChange}
              name={name}
              value={value}
              style={style}
            />
          }
          label={label}
        />
      )) || (
        <FormControl error={error}>
          <FormControlLabel
            control={
              <Checkbox
                className={`App-Checkbox`}
                checked={checked}
                onChange={this.handleOnChange}
                name={name}
                value={value}
                style={style}
              />
            }
            label={label}
          />
          {error && (
            <FormHelperText className={`App-FormHelperText`}>
              {helperText}
            </FormHelperText>
          )}
        </FormControl>
      )
    );
  }
}

export default withStyles(style)(AppCheckBox);
