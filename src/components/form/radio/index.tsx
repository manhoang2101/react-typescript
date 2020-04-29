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
  error?: boolean;
  helperText?: string;
}

class AppRadio extends React.Component<IAppRadioProps> {
  constructor(props: Readonly<IAppRadioProps>) {
    super(props);
    this.handleChange.bind(this);
  }
  handleChange = (_event: any) => {
    const { onChange } = this.props;
    onChange && onChange(_event.target.value);
  };
  render() {
    const { name, style, id, value, label, error, helperText } = this.props;
    return (
      <FormControl variant="outlined" error={error}>
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup
          aria-label={label}
          name={name}
          value={value}
          onChange={this.handleChange}
          id={id}
          style={style}
        >
          {this.props.radioItems.map((item, index) => (
            <FormControlLabel
              key={index}
              value={item.value}
              control={
                <Radio
                  className={`App-RadioGroup`}
                  color={item.color}
                  disabled={item.disabled}
                  style={item.style}
                />
              }
              label={item.label}
            />
          ))}
        </RadioGroup>
        {error && (
          <FormHelperText error className="data-test-FormHelperText">
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
}
export default withStyles(style)(AppRadio);
