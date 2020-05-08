import React from "react";
import style from "../../pages/auth/style";
import {
  WithStyles,
  withStyles,
  Container,
  CssBaseline,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import AppButton from "../../components/form/button";
import AppTextField from "../../components/form/textfield";
import AppCheckBox from "../../components/form/checkbox";
import AppForm from "../../components/form";
import { IFormData, IOptionLogin } from "./type";
import * as Yup from "yup";
import { FormikValues, FormikHelpers } from "formik";
import ContainerProp from "..";
import CONSTANTS from "../../untils/constants";

export interface ILoginContainerProps extends WithStyles<typeof style> {
  onSubmit: (data: any, callBack: (res: any) => void) => void;
}
export interface ILoginContainerState {
  initialValues: IFormData;
  formSchema?: any;
  options: IOptionLogin;
}

type Props = ILoginContainerProps & ContainerProp;
export class LoginContainer extends React.Component<
  Props,
  ILoginContainerState
> {
  constructor(prop: Readonly<Props>) {
    super(prop);
    this.state = {
      initialValues: {
        email: "",
        password: "",
        remember: false,
      },
      options: {
        labelTitle: `Sign in`,
        labelInputUserEmail: `Email Address`,
        labelInputPassword: `Password`,
        labelInputButtonSubmit: `Sign In`,
        labelDoNotAccount: `Don't have an account? Sign Up`,
        labelForgotPassword: ` Forgot password?`,
        labelInputRemember: `Remember me`,
        labelYourWebsite: `Your Website`,
      },
      formSchema: Yup.object().shape({
        email: Yup.string()
          .required("This is field Required")
          .email("Please enter the correct email format"),
        password: Yup.string()
          .required("This is field Required")
          .min(6, "Please enter at least 6 characters"),
      }),
    };
  }
  componentDidMount() {
    const auth = this.props.cookies.get(CONSTANTS.AUTH_KEY);
    if (auth) {
      this.props.history.push("/");
    }
  }
  handleOnSubmitSuccess = (data: any) => {
    this.props.cookies.set(CONSTANTS.AUTH_KEY, data);
    this.props.openNotification("success", "Login successfully", {}, () => {
      setTimeout(() => {
        this.props.history.push("");
      }, 3000);
    });
  };
  handleOnSubmit = (
    values: FormikValues,
    _formikHelpers: FormikHelpers<FormikValues>
  ) => {
    const { onSubmit } = this.props;
    const dataForm = values as IFormData;
    onSubmit(dataForm, this.handleOnSubmitSuccess);
  };
  render() {
    const { classes } = this.props;
    const { initialValues, options, formSchema } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.root}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {options.labelTitle}
          </Typography>
          <AppForm
            initialValues={initialValues}
            formSchema={formSchema}
            onSubmit={this.handleOnSubmit}
            render={(formik) => (
              <>
                <AppTextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label={options.labelInputUserEmail}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  name="email"
                  autoComplete="email"
                  error={
                    formik.errors.email !== undefined && formik.touched.email
                  }
                  helperText={formik.errors.email}
                />
                <AppTextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label={options.labelInputPassword}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  error={
                    formik.errors.password !== undefined &&
                    formik.touched.password
                  }
                  helperText={formik.errors.password}
                />
                <AppCheckBox
                  name="remember"
                  value="true"
                  checked={formik.values.remember}
                  color="primary"
                  label={options.labelInputRemember}
                  onChange={formik.handleChange}
                />
                <AppButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  text={options.labelInputButtonSubmit}
                ></AppButton>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      {options.labelForgotPassword}
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {options.labelDoNotAccount}
                    </Link>
                  </Grid>
                </Grid>
              </>
            )}
          />
          <Box mt={8}>
            <Typography variant="body2" color="textSecondary" align="center">
              {"Copyright © "}
              <Link color="inherit" href="https://material-ui.com/">
                {options.labelYourWebsite}
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Box>
        </div>
      </Container>
    );
  }
}
export default withStyles(style)(LoginContainer);
