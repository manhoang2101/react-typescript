import React, { useState } from "react";
import { Observable } from "rxjs";
import AppAutocomplete, { Option } from "../src/components/form/autocomplete";
export const Default = () => {
  const options: Option[] = [
    { label: "Select1", value: "Select1" },
    { label: "Radio2", value: "Radio2" },
    { label: "Radio3", value: "Radio3" },
    { label: "Radio4", value: "Radio4" },
  ];
  return (
    <AppAutocomplete
      label="Default"
      async={false}
      options={options}
    ></AppAutocomplete>
  );
};
export const Multiple = () => {
  const options: Option[] = [
    { label: "Select1", value: "Select1" },
    { label: "Radio2", value: "Radio2" },
    { label: "Radio3", value: "Radio3" },
    { label: "Radio4", value: "Radio4" },
  ];
  return (
    <AppAutocomplete
      multiple
      async={false}
      options={options}
      label="Multiple"
    ></AppAutocomplete>
  );
};
interface CountryType {
  name: string;
}
export const Asynchronous = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = React.useState<Option[]>([]);
  const handelChange = (t) => {
    setOpen(t);
  };
  const handelChangeInput = (value?: any): Observable<boolean> => {
    return Observable.create((observer) => {
      return fetch(
        "https://country.register.gov.uk/records.json?page-size=5000"
      )
        .then((response) => response.json())
        .then((countries) => {
          const data = Object.keys(countries).map((key) => ({
            value: countries[key].item[0]["country"],
            label: countries[key].item[0]["name"],
          }));
          observer.next(true);
          setOptions(data);
          observer.complete();
        })
        .catch((err) => observer.error(err));
    });
  };
  return (
    <AppAutocomplete
      async
      options={options}
      open={open}
      onChangeOption={handelChange}
      onChangeInput={handelChangeInput}
      label="Asynchronous"
    ></AppAutocomplete>
  );
};
export const AsynchronousMultiple = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = React.useState<Option[]>([]);
  const handelChange = (t) => {
    setOpen(t);
  };
  const handelChangeInput = (value?: any): Observable<boolean> => {
    return Observable.create((observer) => {
      return fetch(
        "https://country.register.gov.uk/records.json?page-size=5000"
      )
        .then((response) => response.json())
        .then((countries) => {
          const data = Object.keys(countries).map((key) => ({
            value: countries[key].item[0]["country"],
            label: countries[key].item[0]["name"],
          }));
          observer.next(true);
          setOptions(data);
          observer.complete();
        })
        .catch((err) => observer.error(err));
    });
  };
  return (
    <AppAutocomplete
      multiple
      async
      options={options}
      open={open}
      onChangeOption={handelChange}
      onChangeInput={handelChangeInput}
      label="AsynchronousMultiple"
    ></AppAutocomplete>
  );
};
export const HasValidate = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = React.useState<Option[]>([]);
  const handelChange = (t) => {
    setOpen(t);
  };
  const handelChangeInput = (value?: any): Observable<boolean> => {
    return Observable.create((observer) => {
      return fetch(
        "https://country.register.gov.uk/records.json?page-size=5000"
      )
        .then((response) => response.json())
        .then((countries) => {
          const data = Object.keys(countries).map((key) => ({
            value: countries[key].item[0]["country"],
            label: countries[key].item[0]["name"],
          }));
          observer.next(true);
          setOptions(data);
          observer.complete();
        })
        .catch((err) => observer.error(err));
    });
  };
  return (
    <AppAutocomplete
      multiple
      error={true}
      helperText={`Loi!`}
      async
      options={options}
      open={open}
      onChangeOption={handelChange}
      onChangeInput={handelChangeInput}
      label="AsynchronousMultiple"
    ></AppAutocomplete>
  );
};
export default { title: "Component/Form/Autocomplete" };
