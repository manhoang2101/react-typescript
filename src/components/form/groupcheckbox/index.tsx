import React from "react";
import {
  WithStyles,
  withStyles,
  FormControl,
  FormLabel,
  FormGroup,
  FormHelperText,
} from "@material-ui/core";
import style from "./style";
import AppCheckBox, { AppCheckBoxProps } from "../checkbox";

export interface AppGroupCheckBoxProps extends WithStyles<typeof style> {
  style?: Object;
  checked: boolean;
  onChange?: (
    values: {
      value?: string;
      label?: string;
    }[],
    event?: any
  ) => void;
  name?: string;
  helperText?: string;
  error?: boolean;
  label?: string;
  required?: boolean;
  checkItems: Partial<AppCheckBoxProps>[];
}
export interface AppGroupCheckBoxState {
  selectItem?: Partial<AppCheckBoxProps>[];
}
class AppGroupCheckBox extends React.Component<
  AppGroupCheckBoxProps,
  AppGroupCheckBoxState
> {
  constructor(props: Readonly<AppGroupCheckBoxProps>) {
    super(props);
    this.state = {
      selectItem: [],
    };
  }
  handleChange = (
    checked: boolean,
    _event?: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { onChange, checkItems } = this.props;
    const { selectItem } = this.state;
    const { value } = (_event && _event.target) || { target: { value: "" } };
    const itemChanged = checkItems
      .filter((check) => check.value === value)
      .shift();
    const values =
      (itemChanged &&
        ((checked && [...((selectItem && selectItem) || []), itemChanged]) ||
          selectItem?.filter((item) => item.value !== itemChanged.value))) ||
      [];

    this.setState({
      selectItem: values,
    });
    console.log(values);
    onChange && onChange(values, _event);
  };
  render() {
    const { checkItems, name, style, error, required, helperText } = this.props;
    return (
      <FormControl
        required={required}
        error={error}
        component="fieldset"
        name={name}
        className={`App-GroupCheckBox`}
        style={style}
      >
        <FormLabel component="legend">label</FormLabel>
        <FormGroup>
          {checkItems.map((item, key) => (
            <AppCheckBox key={key} {...item} onChange={this.handleChange} />
          ))}
        </FormGroup>
        {error && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
}
export default withStyles(style)(AppGroupCheckBox);
