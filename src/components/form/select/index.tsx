import React from "react";
import {
  WithStyles,
  withStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Input,
  Checkbox,
  ListItemText,
  Tooltip,
  FormGroup,
} from "@material-ui/core";
import style from "./style";
export interface ISelectItem {
  label: string;
  value: string;
  disabled?: boolean;
  style?: any;
}

export interface ISelectItemState {
  label: string;
  value?: string;
  disabled?: boolean;
  style?: any;
}
export interface IOptionSelect {
  emptyOption?: ISelectItemState;
  selectAll?: ISelectItemState;
  labels?: {
    others: string;
  };
}
interface IAppSelectState {
  options: IOptionSelect;
  selectedAll: boolean;
  oldSelected?: string[];
  values?: string[];
  selectItems?: ISelectItemState[];
  defaultValue?: any;
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export interface IAppSelectProps extends WithStyles<typeof style> {
  style?: Object;
  value?: any;
  onChange?: (event: any, value: any) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  name?: string;
  label?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  id: string;
  placeholder?: string;
  selectItems: ISelectItem[];
  variant?: "filled" | "standard" | "outlined";
  emptySelectOption?: boolean;
  options?: IOptionSelect;
  multiple?: boolean;
  optionSelectAll?: boolean;
}
class AppSelect extends React.Component<IAppSelectProps, IAppSelectState> {
  state: IAppSelectState = {
    options: {
      emptyOption: {
        label: "-- Choose a option --",
        value: "choose-empty",
      },
      selectAll: {
        label: "Choose All",
        value: "choose-all",
      },
      labels: {
        others: "others",
      },
    },
    selectedAll: false,
    values: [],
  };
  constructor(props: Readonly<IAppSelectProps>) {
    super(props);
    const {
      emptySelectOption,
      selectItems,
      options: propOption,
      value,
    } = this.props;
    const { options: stateOption } = this.state;
    this.state = {
      ...this.state,
      options: { ...stateOption, ...propOption },
      values: (typeof value === "string" && [value]) || value,
      selectItems:
        (emptySelectOption &&
          stateOption &&
          stateOption?.emptyOption && [
            stateOption?.emptyOption,
            ...selectItems,
          ]) ||
        selectItems,
      defaultValue: value,
    };
    this.handleOnChange.bind(this);
  }
  handleOnChange = (_event: any) => {
    const {
      onChange,
      multiple,
      optionSelectAll,
      selectItems,
      emptySelectOption,
    } = this.props;
    const { selectedAll: selectedAll, options, values } = this.state;
    let { value } = _event.target;
    if (optionSelectAll && multiple) {
      const all =
        value.length === selectItems.length ||
        value.includes(options?.selectAll?.value);
      if (all && !selectedAll) {
        this.setState({
          selectedAll: true,
        });
        value = [
          options?.selectAll?.value,
          ...selectItems.map((item) => item.value),
        ];
      } else {
        this.setState({
          selectedAll: false,
        });

        if (
          values?.includes(options?.selectAll?.value as string) &&
          !value?.includes(options?.selectAll?.value as string)
        ) {
          value = [];
        } else {
          value = value.filter(
            (item: string) => item !== options?.selectAll?.value
          );
        }
      }
    }

    value =
      (typeof value === "object" &&
        value.length === 0 &&
        emptySelectOption && [options?.emptyOption?.value]) ||
      value;
    const notSelect = [options?.emptyOption?.value, options?.selectAll?.value];
    this.setState({ values: value });
    value =
      typeof value === "object"
        ? value.filter((item: any) => !notSelect.includes(item))
        : value;
    const event = {
      ..._event,
      target: {
        ..._event.target,
        value: value,
      },
    };
    onChange && onChange(event, value);
  };

  handleRenderValue = (_selected: any): any => {
    const { value, selectItems, emptySelectOption } = this.props;
    const { options } = this.state;
    const label = selectItems
      .filter((item) => value.includes(item.value))
      .map((item) => item.label);
    return (
      (label.length === 0 &&
        emptySelectOption &&
        options?.emptyOption?.label) ||
      (label.length <= 2 && label.join(", ")) || (
        <Tooltip
          className="App-Tooltip"
          title={label.join(", ")}
          aria-label={label.join(", ")}
          placement="top"
        >
          <span>{`${label.slice(0, 2).join(", ")} ( + ${label.length - 2} ${
            options.labels?.others
          })`}</span>
        </Tooltip>
      )
    );
  };
  handleOnFocus = (event: React.ChangeEvent<{}>) => {
    const { onFocus } = this.props;
    onFocus && onFocus(event);
  };
  handleOnBlur = (event: React.ChangeEvent<{}>) => {
    const { onBlur } = this.props;
    onBlur && onBlur(event);
  };
  render() {
    const {
      classes,
      value,
      selectItems,
      label,
      id,
      name,
      placeholder,
      error,
      helperText,
      variant,
      disabled,
      style,
      multiple,
      emptySelectOption,
      optionSelectAll,
    } = this.props;
    const { options, selectedAll, defaultValue, values } = this.state;

    return (
      <FormGroup>
        <FormControl
          className={classes.formControl}
          variant={variant}
          error={!!error}
        >
          <InputLabel className={`App-InputLabel`} id={`label-${id}`}>
            {label}
          </InputLabel>
          <Select
            className={`App-Select`}
            labelId={`label-${id}`}
            id={id}
            error={!!error}
            defaultValue={defaultValue}
            value={values}
            onChange={this.handleOnChange}
            placeholder={placeholder}
            disabled={disabled}
            style={{ ...style, minWidth: 120 }}
            multiple={multiple}
            input={<Input name={name} className={classes.formControl} />}
            MenuProps={MenuProps}
            onOpen={this.handleOnFocus}
            onClose={this.handleOnBlur}
            {...((multiple && { renderValue: this.handleRenderValue }) || {})}
          >
            {emptySelectOption && !multiple && (
              <MenuItem
                key={options?.emptyOption?.value}
                value={options?.emptyOption?.value}
                style={options?.emptyOption?.style}
              >
                <em>{options?.emptyOption?.label}</em>
              </MenuItem>
            )}
            {optionSelectAll && multiple && (
              <MenuItem
                key={options?.selectAll?.value}
                value={options?.selectAll?.value}
                style={options?.selectAll?.style}
              >
                <Checkbox checked={selectedAll} />
                <ListItemText primary={options.selectAll?.label} />
              </MenuItem>
            )}
            {selectItems.map((item) => (
              <MenuItem key={item.value} value={item.value} style={item.style}>
                {(multiple && (
                  <>
                    <Checkbox checked={value.includes(item.value)} />
                    <ListItemText primary={item.label} />
                  </>
                )) ||
                  item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {!!error && (
          <FormHelperText error={!!error} className="App-FormHelperText">
            {helperText}
          </FormHelperText>
        )}
      </FormGroup>
    );
  }
}
export default withStyles(style)(AppSelect);
