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
  onChange?: (event?: any, values?: Partial<IAppCheckBoxProps>[]) => void;
  name?: string;
  helperText?: string;
  error?: boolean;
  label?: string;
  required?: boolean;
  checkItems: Partial<IAppCheckBoxProps>[];
  values?: string[];
}
export interface IAppGroupCheckBoxState {
  selectItem: Partial<IAppCheckBoxProps>[];
  checkItems: Partial<IAppCheckBoxProps>[];
}
class AppGroupCheckBox extends React.Component<
  IAppGroupCheckBoxProps,
  IAppGroupCheckBoxState
> {
  constructor(props: Readonly<IAppGroupCheckBoxProps>) {
    super(props);
    const { checkItems, values } = this.props;
    const selectItem =
      (values &&
        checkItems.filter((item) => values.includes(item?.value as string))) ||
      [];
    this.state = {
      selectItem,
      checkItems: checkItems.map((item) => ({
        ...item,
        checked: (values && values.includes(item?.value as string)) || false,
      })),
    };
  }
  handleOnChange = (
    _event?: React.ChangeEvent<HTMLInputElement>,
    checked?: boolean
  ) => {
    const { onChange, checkItems } = this.props;
    const { selectItem } = this.state;
    const { value } = (_event && _event.target) || { target: { value: "" } };
    const itemChanged = checkItems
      .filter((check) => check.value === value)
      .shift();
    const values =
      (itemChanged &&
        ((checked && [...selectItem, itemChanged]) ||
          selectItem?.filter((item) => item.value !== itemChanged.value))) ||
      [];
    this.setState({
      selectItem: values,
      checkItems: checkItems.map((item) => ({
        ...item,
        checked:
          (values &&
            values
              .map((item) => item.value as string)
              .includes(item?.value as string)) ||
          false,
      })),
    });
    onChange && onChange(_event, values);
  };

  render() {
    const { name, style, label, error, required, helperText } = this.props;
    const { checkItems } = this.state;
    return (
      <FormControl
        required={required}
        error={error}
        component="fieldset"
        name={name}
        className={`App-GroupCheckBox`}
        style={style}
      >
        <FormLabel component="legend" className={`App-FormLabel`}>
          {label}
        </FormLabel>
        <FormGroup>
          {checkItems.map((item, key) => (
            <AppCheckBox key={key} {...item} onChange={this.handleOnChange} />
          ))}
        </FormGroup>
        {error && (
          <FormHelperText className={`App-FormHelperText`}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
}

export default withStyles(style)(AppGroupCheckBox);