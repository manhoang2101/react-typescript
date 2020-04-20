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
  emtyOption?: ISelectItemState;
  selectAll?: ISelectItemState;
  lables?: {
    others: string;
  };
}
interface AppSelectState {
  options: OptionSelect;
  seletedAll: boolean;
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
  emtySelectOption?: boolean;
  options?: OptionSelect;
  multiple?: boolean;
  optionSelectAll?: boolean;
}
class AppSelect extends React.Component<AppSelectProps, AppSelectState> {
  state: AppSelectState = {
    options: {
      emtyOption: {
        label: "-- Choose a option --",
        value: "choose-emty",
      },
      selectAll: {
        label: "Choose All",
        value: "choose-all",
      },
      lables: {
        others: "others",
      },
    },
    seletedAll: false,
    values: [],
  };
  constructor(props: Readonly<AppSelectProps>) {
    super(props);
    const {
      emtySelectOption,
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
        (emtySelectOption &&
          stateOption &&
          stateOption?.emtyOption && [
            stateOption?.emtyOption,
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
      emtySelectOption,
    } = this.props;
    const { seletedAll, options, values } = this.state;
    let { value } = _event.target;

    if (optionSelectAll && multiple) {
      const all =
        value.length === selectItems.length ||
        value.includes(options?.selectAll?.value);
      if (all && !seletedAll) {
        this.setState({
          seletedAll: true,
        });
        value = [
          options?.selectAll?.value,
          ...selectItems.map((item) => item.value),
        ];
      } else {
        this.setState({
          seletedAll: false,
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
        emtySelectOption && [options?.emtyOption?.value]) ||
      value;
    const notSelect = [options?.emtyOption?.value, options?.selectAll?.value];
    this.setState({ values: value });
    value =
      typeof value === "object"
        ? value.filter((item: any) => !notSelect.includes(item))
        : value;
    onChange && onChange(value);
  };

  handleRenderValue = (_selected: any): any => {
    const { value, selectItems, emtySelectOption } = this.props;
    const { options } = this.state;
    const lable = selectItems
      .filter((item) => value.includes(item.value))
      .map((item) => item.label);
    return (
      (lable.length === 0 && emtySelectOption && options?.emtyOption?.label) ||
      (lable.length <= 2 && lable.join(", ")) || (
        <Tooltip
          className="data-test-handleRenderValue"
          title={lable.join(", ")}
          aria-label={lable.join(", ")}
          placement="top"
        >
          <span>{`${lable.slice(0, 2).join(", ")} ( + ${lable.length - 2} ${
            options.lables?.others
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
      emtySelectOption,
      optionSelectAll,
    } = this.props;
    const { options, seletedAll, values } = this.state;

    return (
      <FormControl className={classes.formControl} variant={variant}>
        <InputLabel id={`label-${id}`}>{label}</InputLabel>
        <Select
          labelId={`label-${id}`}
          id={id}
          error={error}
          value={values}
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
          {emtySelectOption && !multiple && (
            <MenuItem
              key={options?.emtyOption?.value}
              value={options?.emtyOption?.value}
              style={options?.emtyOption?.style}
            >
              <em>{options?.emtyOption?.label}</em>
            </MenuItem>
          )}
          {optionSelectAll && multiple && (
            <MenuItem
              key={options?.selectAll?.value}
              value={options?.selectAll?.value}
              style={options?.selectAll?.style}
            >
              <Checkbox checked={seletedAll} />
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
