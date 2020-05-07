import React from "react";
import style from "./style";
import { FormikValues } from "formik";
import { Formik, FormikHelpers, Form } from "formik";
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
  className?: string;
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
      className,
    } = this.props;
    const appFormClass = ["App-Form", className];
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={this.handleOnSubmit}
        initialStatus={initialStatus}
      >
        {(formik) => (
          <Form className={appFormClass.join(" ")}>{render(formik)}</Form>
        )}
      </Formik>
    );
  }
}
export default withStyles(style)(AppFrom);
