import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import style from "./style";
import { Observable } from "rxjs";
import {
  WithStyles,
  withStyles,
  Checkbox,
  Chip,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import { error } from "console";
export interface Option {
  value: string;
  label: string;
  style?: Object;
}
export interface AppAutocompleteProps extends WithStyles<typeof style> {
  style?: Object;
  onChangeInput?: (value: string, event?: any) => Observable<boolean>;
  options: Option[];
  option?: any;
  loading?: boolean;
  open?: boolean;
  multiple?: boolean;
  async: boolean;
  label?: string;
  onClose?: () => void;
  onOpen?: () => void;
  renderOption?: () => string | JSX.Element;
  onChangeOption?: (options: Option[], event: any) => void;
  variant?: "filled" | "standard" | "outlined" | undefined;
  disabled?: boolean;
  filterOptions?: () => Option[];
  error?: boolean;
  helperText?: string;
  minLengthCallChangeInput?: number;
}
export interface AppAutocompleteStates {
  open: boolean;
  loading: boolean;
}
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

class AppAutocomplete extends React.Component<
  AppAutocompleteProps,
  AppAutocompleteStates
> {
  state: AppAutocompleteStates = {
    open: false,
    loading: false,
  };
  constructor(props: Readonly<AppAutocompleteProps>) {
    super(props);
    const { open, loading } = this.props;
    this.state = {
      open: (open && open) || false,
      loading: (loading && loading) || false,
    };
    this.handleOnChangeInput.bind(this);
    this.handleOnChangeOption.bind(this);
  }
  handleOnChangeInput = (_event: object, value: string, _reason: string) => {
    const { onChangeInput, minLengthCallChangeInput } = this.props;
    const minChar = (minLengthCallChangeInput && minLengthCallChangeInput) || 1;
    if (minChar && value.length < minChar) return true;
    this.setState({ loading: true });
    onChangeInput &&
      onChangeInput(value, _event).subscribe((_res) => {
        this.setState({
          loading: false,
        });
      });
  };
  handleOnChangeOption = (_event: React.ChangeEvent<{}>, values: any) => {
    const { onChangeOption } = this.props;
    onChangeOption && onChangeOption(values, _event);
  };
  handleOpen = () => {
    const { onOpen } = this.props;
    this.setState({
      open: true,
    });
    onOpen && onOpen();
  };
  handleClose = () => {
    const { onClose } = this.props;
    this.setState({
      open: false,
    });
    onClose && onClose();
  };

  handleRenderOption = (option: Option, state: any): string | JSX.Element => {
    const { renderOption, multiple } = this.props;
    const { selected } = state;
    return (
      (renderOption && renderOption()) ||
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
  render() {
    const {
      variant,
      async,
      multiple,
      classes,
      label,
      options,
      option,
      disabled,
      filterOptions,
      error,
      helperText,
    } = this.props;
    const { open, loading } = this.state;
    return (
      <FormControl>
        <Autocomplete
          defaultValue={option}
          autoComplete={!async}
          multiple={multiple}
          id="App-Autocomplete"
          options={options}
          getOptionLabel={(option) => option.label}
          filterOptions={filterOptions}
          style={{ width: 300 }}
          open={open}
          disabled={disabled}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
          popupIcon={<KeyboardArrowDownIcon />}
          onInputChange={this.handleOnChangeInput}
          renderTags={(values: Option[], getTagProps) =>
            values.map((option: Option, index: number) => (
              <Chip
                variant="outlined"
                label={option.label}
                {...getTagProps({ index })}
              />
            ))
          }
          renderOption={this.handleRenderOption}
          onChange={this.handleOnChangeOption}
          renderInput={(params) =>
            (async && (
              <TextField
                {...params}
                label={label}
                variant={variant}
                InputProps={{
                  ...params.InputProps,
                  className: classes.TextField,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )) || <TextField {...params} label={label} variant={variant} />
          }
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
export default withStyles(style)(AppAutocomplete);
