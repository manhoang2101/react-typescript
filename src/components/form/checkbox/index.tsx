import React from "react";
import {
  WithStyles,
  Checkbox,
  withStyles,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import style from "./style";

export interface AppCheckBoxProps extends WithStyles<typeof style> {
  style?: Object;
  checked: boolean;
  onChange?: (value: boolean, event?: any) => void;
  name?: string;
  helperText?: string;
  error?: boolean;
}
class AppCheckBox extends React.Component<AppCheckBoxProps> {
  constructor(props: Readonly<AppCheckBoxProps>) {
    super(props);
    this.handleChange.bind(this);
  }
  handleChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const { onChange } = this.props;
    onChange && onChange(checked, _event);
  };
  render() {
    const { checked, name, style, helperText, error } = this.props;
    return (
      <FormControl>
        <Checkbox
          checked={checked}
          onChange={this.handleChange}
          name={name}
          style={style}
        />
        {error && (
          <FormHelperText error className="data-test-FormHelperText">
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
}
export default withStyles(style)(AppCheckBox);
