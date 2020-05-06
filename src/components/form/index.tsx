import React from "react";
import style from "./style";
import { useFormik, FormikValues, withFormik } from "formik";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";
import { withStyles, WithStyles } from "@material-ui/core/styles";

export interface IAppFormProps extends WithStyles<typeof style> {
  onSubmit: (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>
  ) => void;
  initialValues: Object;
  render: (formik: any) => any;
  formSchema?: any;
  initialErrors?: (formik: any) => void;
  initialStatus?: (formik: any) => void;
  initialTouched?: (formik: any) => void;
}
export class AppFrom extends React.Component<IAppFormProps> {
  formik: any;
  constructor(prop: Readonly<IAppFormProps>) {
    super(prop);
  }
  handleOnSubmit = (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>
  ) => {
    const { onSubmit } = this.props;
    onSubmit(values, formikHelpers);
  };

  render() {
    const {
      initialValues,
      formSchema,
      render,
      initialStatus,
      initialErrors,
      initialTouched,
    } = this.props;
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={this.handleOnSubmit}
        initialStatus={initialStatus}
      >
        {(formik) => <Form>{render(formik)}</Form>}
      </Formik>
    );
  }
}
export default withStyles(style)(AppFrom);
