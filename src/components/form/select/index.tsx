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
export interface OptionSelect {
  emptyOption?: ISelectItemState;
  selectAll?: ISelectItemState;
  labels?: {
    others: string;
  };
}
interface AppSelectState {
  options: OptionSelect;
  selectedAll: boolean;
  oldSelected?: string[];
  values?: string[];
  selectItems?: ISelectItemState[];
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
export interface AppSelectProps extends WithStyles<typeof style> {
  style?: Object;
  value?: any;
  onChange?: (value: string) => void;
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
  options?: OptionSelect;
  multiple?: boolean;
  optionSelectAll?: boolean;
}
class AppSelect extends React.Component<AppSelectProps, AppSelectState> {
  state: AppSelectState = {
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
  constructor(props: Readonly<AppSelectProps>) {
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
    };
    this.handleChange.bind(this);
  }
  handleChange = (_event: any) => {
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
    onChange && onChange(value);
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
          className="data-test-handleRenderValue"
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
  handleFocus = (event: React.ChangeEvent<{}>) => {
    const { onFocus } = this.props;
    onFocus && onFocus(event);
  };
  handleBlur = (event: React.ChangeEvent<{}>) => {
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
    const { options, selectedAll: selectedAll, values } = this.state;

    return (
      <FormControl className={classes.formControl} variant={variant}>
        <InputLabel id={`label-${id}`}>{label}</InputLabel>
        <Select
          labelId={`label-${id}`}
          id={id}
          error={error}
          defaultValue={values}
          name={name}
          onChange={this.handleChange}
          placeholder={placeholder}
          disabled={disabled}
          style={style}
          multiple={multiple}
          input={<Input />}
          MenuProps={MenuProps}
          onOpen={this.handleFocus}
          onClose={this.handleBlur}
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
        {error && (
          <FormHelperText error className="data-test-FormHelperText">
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
}
export default withStyles(style)(AppSelect);
