import React, { useState } from "react";
import AppForm from "../src/components/form";
import AppRadio, { IRadioItem } from "../src/components/form/radio";
import AppButton from "../src/components/form/button";
import AppTextField from "../src/components/form/textfield";
import AppGroupCheckBox from "../src/components/form/groupcheckbox";
import AppSelect, { ISelectItem } from "../src/components/form/select";
import * as Yup from "yup";
export const Basic = () => {
  const radioItem: IRadioItem[] = [
    { label: "Radio1", value: "Radio1", color: "primary" },
    { label: "Radio2", value: "Radio2" },
    { label: "Radio3", value: "Radio3" },
    { label: "Radio4", value: "Radio4" },
  ];
  const checkItem = [
    {
      label: "001",
      value: "001",
    },
    {
      label: "002",
      value: "002",
    },
    {
      label: "003",
      value: "003",
    },
  ];
  const selectItem: ISelectItem[] = [
    { label: "Select1", value: "Select1" },
    { label: "Radio2", value: "Radio2" },
    { label: "Radio3", value: "Radio3" },
    { label: "Radio4", value: "Radio4" },
  ];
  const SignupSchema = Yup.object().shape({
    AppRadio: Yup.string().required("this is field Required"),
    TextField: Yup.string().required("this is field Required"),
    AppGroupCheckBox: Yup.string().required("this is field Required"),
    AppSelect: Yup.string().required("this is field Required"),
  });
  const initialValues = {
    AppRadio: "",
    TextField: "",
    AppGroupCheckBox: "",
    AppSelect: [],
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
            label={`AppRadio *`}
            error={
              formik.errors.AppRadio !== undefined && formik.touched.AppRadio
            }
            helperText={formik.errors.AppRadio}
          ></AppRadio>
          <br />
          <AppTextField
            name={`TextField`}
            value={formik.values.TextField}
            onChange={formik.handleChange}
            label={`AppTextField *`}
            error={
              formik.errors.TextField !== undefined && formik.touched.TextField
            }
            helperText={formik.errors.TextField}
            onBlur={formik.handleBlur}
          ></AppTextField>
          <br />
          <AppGroupCheckBox
            label={`AppGroupCheckBox *`}
            onChange={(_e, v) => formik.setFieldValue("AppGroupCheckBox", v)}
            checkItems={checkItem}
            name={`AppGroupCheckBox[]`}
            values={formik.values.AppGroupCheckBox}
            error={
              formik.errors.AppGroupCheckBox !== undefined &&
              formik.touched.AppGroupCheckBox
            }
            helperText={formik.errors.AppGroupCheckBox}
          />
          <br />
          <AppSelect
            optionSelectAll
            onChange={formik.handleChange}
            multiple
            selectItems={selectItem}
            name={"AppSelect"}
            label={`AppSelect *`}
            value={formik.values.AppSelect}
            id="test"
            error={
              formik.errors.AppSelect !== undefined && formik.touched.AppSelect
            }
            helperText={formik.errors.AppSelect}
          />
          <br />
          <AppButton
            type="submit"
            variant="contained"
            color="primary"
            text="Submit"
            onClick={() => console.log(formik)}
          />
        </>
      )}
    ></AppForm>
  );
};
export default { title: "Component/Form" };
