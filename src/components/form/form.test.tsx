import React from "react";
import AppForm from ".";
import AppRadio, { IRadioItem } from "./radio";
import AppButton from "./button";
import { withStyles } from "@material-ui/core";
import { render, fireEvent, act } from "@testing-library/react";
import * as Yup from "yup";
import style from "./style";
import { shallow } from "enzyme";

describe("<AppForm />", () => {
  const Component = withStyles(style)(AppForm);
  test("should test render form ", () => {
    const radioItem: IRadioItem[] = [
      { label: "Radio1", value: "Radio1", color: "primary" },
      { label: "Radio2", value: "Radio2" },
      { label: "Radio3", value: "Radio3" },
      { label: "Radio4", value: "Radio4" },
    ];
    const schema = Yup.object().shape({
      AppRadio: Yup.string().required("this is field Required"),
    });
    const initialValues = {
      AppRadio: "",
    };
    const { container } = render(
      <Component
        onSubmit={(value) => console.log(value)}
        formSchema={schema}
        initialValues={initialValues}
        render={(formik) => (
          <>
            <AppRadio
              className={`data-test-radio`}
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
            <AppButton
              type="submit"
              variant="contained"
              color="primary"
              text="Submit"
              onClick={() => console.log(formik)}
            />
          </>
        )}
      />
    );
    const el = container.querySelectorAll(".data-test-radio");
    expect(el.length).toBe(1);
  });

  test("should test handleOnSubmit form ", async () => {
    const radioItem: IRadioItem[] = [
      { label: "Radio1", value: "Radio1", color: "primary" },
      { label: "Radio2", value: "Radio2" },
      { label: "Radio3", value: "Radio3" },
      { label: "Radio4", value: "Radio4" },
    ];
    const schema = Yup.object().shape({
      AppRadio: Yup.string().required("this is field Required"),
    });
    const initialValues = {
      AppRadio: "Radio1",
    };
    const handleSubmit = jest.fn();
    const { container } = render(
      <Component
        onSubmit={handleSubmit}
        formSchema={schema}
        initialValues={initialValues}
        render={(formik) => (
          <>
            <AppRadio
              className={`data-test-radio`}
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
            <AppButton
              className="data-test-button"
              type="submit"
              variant="contained"
              color="primary"
              text="Submit"
            />
          </>
        )}
      />
    );
    const el = container.querySelectorAll(".data-test-button");
    expect(el.item(0)).toHaveTextContent("Submit");
    await act(async () => {
      fireEvent.click(el.item(0));
    });
    expect(handleSubmit).toHaveBeenCalled();
  });
});
