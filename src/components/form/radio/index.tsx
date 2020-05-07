import React from "react";
import {
  WithStyles,
  withStyles,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
  FormGroup,
} from "@material-ui/core";
import style from "./style";
export interface IRadioItem {
  label: string;
  value: string;
  disabled?: boolean;
  style?: any;
  color?: "default" | "primary" | "secondary";
}
export interface IAppRadioProps extends WithStyles<typeof style> {
  style?: Object;
  value?: any;
  onChange?: (value: string) => void;
  name?: string;
  label?: string;
  id?: string;
  radioItems: IRadioItem[];
  className?: string;
  error?: boolean;
  helperText?: string;
}

class AppRadio extends React.Component<IAppRadioProps> {
  constructor(props: Readonly<IAppRadioProps>) {
    super(props);
  }
  handleOnChange = (_event: any) => {
    const { onChange } = this.props;
    onChange && onChange(_event);
  };
  render() {
    const {
      name,
      style,
      id,
      value,
      label,
      error,
      helperText,
      className,
    } = this.props;
    const appGroupRadioClass = ["App-GroupRadio", className];
    return (
      <FormGroup className={appGroupRadioClass.join(" ")}>
        <FormControl error={!!error}>
          <FormLabel component="legend">{label}</FormLabel>
          <RadioGroup
            aria-label={label}
            name={name}
            value={value}
            onChange={this.handleOnChange}
            id={id}
            style={style}
          >
            {this.props.radioItems.map((item, index) => (
              <FormControlLabel
                key={index}
                value={item.value}
                control={
                  <Radio
                    className={`App-Radio`}
                    color={item.color}
                    disabled={item.disabled}
                    style={item.style}
                  />
                }
                label={item.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
        {!!error && (
          <FormHelperText error={!!error} className="data-test-FormHelperText">
            {helperText}
          </FormHelperText>
        )}
      </FormGroup>
    );
  }
}
export default withStyles(style)(AppRadio);
