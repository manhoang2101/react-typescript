import React, { ChangeEvent } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import style from "./style";
import { Observable } from "rxjs";
import { WithStyles, withStyles, Checkbox, Chip } from "@material-ui/core";

export interface IOption {
  value: string;
  label: string;
  style?: Object;
}
export interface AppAutocompleteProps extends WithStyles<typeof style> {
  style?: Object;
  onChangeInput?: (value: string, event?: any) => Observable<boolean>;
  options: IOption[];
  option?: any;
  loading?: boolean;
  open?: boolean;
  multiple?: boolean;
  async?: boolean;
  label?: string;
  onClose?: () => void;
  onOpen?: () => void;
  renderOption?: (options: IOption) => string | JSX.Element;
  onChangeOption?: (event: any, options: IOption[]) => void;
  getOptionSelected?: (selected: IOption) => boolean;
  renderTextField?: (params: any) => any;
  renderTags?: (options: IOption[], getTagProps: any) => any;
  getOptionLabel?: (option: IOption) => any;
  variant?: "filled" | "standard" | "outlined" | undefined;
  disabled?: boolean;
  filterOptions?: () => IOption[];
  error?: boolean;
  helperText?: string;
  minLengthCallChangeInput?: number;
  onBlur?: (event?: any) => void;
  name?: string;
  className?: string;
}
export interface AppAutocompleteStates {
  open: boolean;
  loading: boolean;
  onSelect: boolean;
  defaultValue: any;
}
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option: IOption) => option.label,
});

class AppAutocomplete extends React.Component<
  AppAutocompleteProps,
  AppAutocompleteStates
> {
  constructor(props: Readonly<AppAutocompleteProps>) {
    super(props);
    const { open, loading, option } = this.props;
    this.state = {
      open: (open && open) || false,
      loading: (loading && loading) || false,
      onSelect: false,
      defaultValue: option,
    };
  }
  private handleOnChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { onChangeInput, minLengthCallChangeInput } = this.props;
    const { value } = event.target;
    const minChar = (minLengthCallChangeInput && minLengthCallChangeInput) || 1;
    if (minChar && value.length < minChar) return true;
    this.setState({ loading: true });
    onChangeInput &&
      onChangeInput(value, event).subscribe((_res) => {
        this.setState({
          loading: false,
        });
      });
  };
  private handleOnChangeOption = (
    _event: React.ChangeEvent<{}>,
    values: any
  ) => {
    const { onChangeOption } = this.props;
    const event = {
      ..._event,
      target: {
        ..._event.target,
        value: values,
      },
    };

    onChangeOption && onChangeOption(event, values);
  };
  private handleOpen = () => {
    const { onOpen } = this.props;
    this.setState({
      open: true,
    });
    onOpen && onOpen();
  };
  private handleClose = () => {
    const { onClose } = this.props;
    this.setState({
      open: false,
    });
    onClose && onClose();
  };

  private handleRenderOption = (
    option: IOption,
    state: any
  ): string | JSX.Element => {
    const { renderOption, multiple } = this.props;
    const { selected } = state;
    return (
      (renderOption && renderOption(option)) ||
      (multiple && (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={option.style}
            checked={selected}
          />
          {option.label}
        </React.Fragment>
      )) ||
      option.label
    );
  };
  private handleRenderTextField = (params: any) => {
    const {
      async,
      label,
      classes,
      error,
      helperText,
      variant,
      renderTextField,
      name,
    } = this.props;

    return (
      (renderTextField && renderTextField(params)) ||
      (async && (
        <TextField
          className="App-TextField Async"
          {...params}
          label={label}
          variant={variant}
          onChange={this.handleOnChangeInput}
          InputProps={{
            ...params.InputProps,
            className: classes.textField,
          }}
          error={!!error}
          helperText={!!error && helperText}
          name={name}
        />
      )) || (
        <TextField
          className="App-TextField"
          {...params}
          label={label}
          variant={variant}
          name={name}
          error={!!error}
          helperText={!!error && helperText}
        />
      )
    );
  };
  private handelRenderTags = (values: IOption[], getTagProps: any) => {
    const { renderTags } = this.props;
    return (
      (renderTags && renderTags(values, values)) ||
      values.map((option: IOption, index: number) => (
        <Chip
          variant="outlined"
          label={option.label}
          {...getTagProps({ index })}
          className={`App-Chip`}
        />
      ))
    );
  };
  private handleGetOptionSelected = (selected: IOption) => {
    const { getOptionSelected, multiple, option } = this.props;
    return (
      !multiple ||
      (getOptionSelected && getOptionSelected(selected)) ||
      (option &&
        option.filter((item: IOption) => item.value === selected.value)
          .length) ||
      false
    );
  };
  private handelGetOptionLabel = (option: IOption) => {
    const { getOptionLabel } = this.props;
    return (getOptionLabel && getOptionLabel(option)) || option.label;
  };
  render() {
    const {
      async,
      multiple,
      classes,
      options,
      disabled,
      onBlur,
      className,
    } = this.props;
    const { open, loading, defaultValue } = this.state;
    const appAutocompleteClass = ["App-Autocomplete", className];
    return (
      <Autocomplete
        onBlur={onBlur}
        autoComplete={!async}
        multiple={multiple}
        defaultValue={defaultValue}
        className={appAutocompleteClass.join(" ")}
        options={options}
        getOptionLabel={this.handelGetOptionLabel}
        filterOptions={filterOptions}
        style={{ width: 300 }}
        open={open}
        disabled={disabled}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
        popupIcon={<ExpandMoreIcon></ExpandMoreIcon>}
        forcePopupIcon={true}
        classes={{
          popupIndicator: classes.popupIndicator,
          clearIndicator: classes.clearIndicator,
        }}
        getOptionSelected={this.handleGetOptionSelected}
        renderTags={this.handelRenderTags}
        loading={loading}
        renderOption={this.handleRenderOption}
        onChange={this.handleOnChangeOption}
        renderInput={this.handleRenderTextField}
      />
    );
  }
}
export default withStyles(style)(AppAutocomplete);
