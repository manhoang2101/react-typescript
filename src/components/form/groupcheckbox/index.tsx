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
import AppCheckBox, { IAppCheckBoxProps } from "../checkbox";

export interface IAppGroupCheckBoxProps extends WithStyles<typeof style> {
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
  checkItems: Partial<IAppCheckBoxProps>[];
}
export interface IAppGroupCheckBoxState {
  selectItem?: Partial<IAppCheckBoxProps>[];
}
class IAppGroupCheckBox extends React.Component<
  IAppGroupCheckBoxProps,
  IAppGroupCheckBoxState
> {
  constructor(props: Readonly<IAppGroupCheckBoxProps>) {
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
export default withStyles(style)(IAppGroupCheckBox);
