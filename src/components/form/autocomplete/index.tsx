import React, { ChangeEvent } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import style from "./style";
import { Observable } from "rxjs";
import { WithStyles, withStyles, Checkbox, Chip } from "@material-ui/core";
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
  onSelect: boolean;
}
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

class AppAutocomplete extends React.Component<
  AppAutocompleteProps,
  AppAutocompleteStates
> {
  constructor(props: Readonly<AppAutocompleteProps>) {
    super(props);
    const { open, loading } = this.props;
    this.state = {
      open: (open && open) || false,
      loading: (loading && loading) || false,
      onSelect: false,
    };
  }
  handleOnChangeInput = (
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
      <Autocomplete
        defaultValue={option}
        autoComplete={!async}
        multiple={multiple}
        className="App-Autocomplete"
        options={options}
        getOptionLabel={(option) => option.label}
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
        renderTags={(values: Option[], getTagProps) =>
          values.map((option: Option, index: number) => (
            <Chip
              variant="outlined"
              label={option.label}
              {...getTagProps({ index })}
            />
          ))
        }
        loading={loading}
        renderOption={this.handleRenderOption}
        onChange={this.handleOnChangeOption}
        renderInput={(params) =>
          (async && (
            <TextField
              {...params}
              label={label}
              variant={variant}
              onChange={this.handleOnChangeInput}
              InputProps={{
                ...params.InputProps,
                className: classes.textField,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
              error={error}
              helperText={helperText}
            />
          )) || <TextField {...params} label={label} variant={variant} />
        }
      />
    );
  }
}
export default withStyles(style)(AppAutocomplete);
