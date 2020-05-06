import React, { useState } from "react";
import AppForm from "../src/components/form";
import AppRadio, { IRadioItem } from "../src/components/form/radio";
import AppButton from "../src/components/form/button";
import AppTextField from "../src/components/form/textfield";

import * as Yup from "yup";
export const Basic = () => {
  const radioItem: IRadioItem[] = [
    { label: "Radio1", value: "Radio1", color: "primary" },
    { label: "Radio2", value: "Radio2" },
    { label: "Radio3", value: "Radio3" },
    { label: "Radio4", value: "Radio4" },
  ];
  const SignupSchema = Yup.object().shape({
    AppRadio: Yup.string().required("Required"),
    TextField: Yup.string().required("Required"),
  });
  const initialValues = {
    AppRadio: "",
    TextField: "",
  };

  return (
    <AppForm
      onSubmit={(value) => console.log(value)}
      formSchema={SignupSchema}
      initialValues={initialValues}
      render={(formik) => (
        <>
          <AppRadio
            name={`AppRadio`}
            value={formik.values.AppRadio}
            radioItems={radioItem}
            onChange={formik.handleChange}
          ></AppRadio>
          <br />
          <AppTextField
            name={`TextField`}
            value={formik.values.TextField}
            onChange={formik.handleChange}
          ></AppTextField>
          <br />
          <button type="submit">Submit</button>
        </>
      )}
    ></AppForm>
  );
};
export default { title: "Component/Form" };
