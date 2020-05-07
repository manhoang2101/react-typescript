import React, { useState } from "react";
import { Observable } from "rxjs";
import AppAutocomplete, {
  IOption,
} from "../../src/components/form/autocomplete";
export const Default = () => {
  const options: IOption[] = [
    { label: "Select1", value: "Select1" },
    { label: "Select2", value: "Select2" },
    { label: "Select3", value: "Select3" },
    { label: "Select4", value: "Select4" },
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
  const items: IOption[] = [
    { label: "Select1", value: "Select1" },
    { label: "Select2", value: "Select2" },
    { label: "Select3", value: "Select3" },
    { label: "Select4", value: "Select4" },
  ];
  const [options] = React.useState<IOption[]>(items);
  const [option, setOption] = React.useState<IOption[]>([]);
  const handelOnChangeOption = (e, v) => {
    setOption(v);
  };
  return (
    <AppAutocomplete
      multiple
      async={false}
      options={options}
      option={option}
      label="Multiple"
      onChangeOption={handelOnChangeOption}
    ></AppAutocomplete>
  );
};
export const MultipleHasDefault = () => {
  const options: IOption[] = [
    { label: "Select1", value: "Select1" },
    { label: "Select2", value: "Select2" },
    { label: "Select3", value: "Select3" },
    { label: "Select4", value: "Select4" },
  ];
  const [option, setOption] = React.useState<IOption[]>([
    { label: "Select1", value: "Select1" },
  ]);
  const handelOnChangeOption = (e, v) => {
    setOption(v);
  };
  return (
    <AppAutocomplete
      multiple
      async={false}
      options={options}
      label="Multiple"
      option={option}
      onChangeOption={handelOnChangeOption}
    ></AppAutocomplete>
  );
};
export const Asynchronous = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = React.useState<IOption[]>([]);
  const [option, setOption] = React.useState<IOption>();
  const handelOnChangeOption = (e, v) => {
    setOption(v);
  };
  const handelChangeInput = (value?: any): Observable<boolean> => {
    return Observable.create((observer) => {
      return fetch(
        "https://country.register.gov.uk/records.json?page-size=5000"
      )
        .then((response) => response.json())
        .then((countries) => {
          const data = Object.keys(countries)
            .map((key) => ({
              value: countries[key].item[0]["country"],
              label: countries[key].item[0]["name"],
            }))
            .filter((item) => (option && option.value !== item.value) || true);
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
      option={option}
      open={open}
      onChangeOption={handelOnChangeOption}
      onChangeInput={handelChangeInput}
      label="Asynchronous"
    ></AppAutocomplete>
  );
};
export const AsynchronousMultiple = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = React.useState<IOption[]>([]);
  const [option, setOption] = React.useState<IOption[]>([]);
  const handelOnChangeOption = (e, v) => {
    setOption(v);
  };
  const handelChangeInput = (value?: any): Observable<boolean> => {
    return Observable.create((observer) => {
      return fetch(
        "https://country.register.gov.uk/records.json?page-size=5000"
      )
        .then((response) => response.json())
        .then((countries) => {
          const data = Object.keys(countries)
            .map((key) => ({
              value: countries[key].item[0]["country"],
              label: countries[key].item[0]["name"],
            }))
            .filter(
              (item) =>
                option.filter((item1) => item.value === item1.value).length ===
                0
            );
          setOptions(data);
          observer.next(true);
          observer.complete(true);
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
      onChangeOption={handelOnChangeOption}
      onChangeInput={handelChangeInput}
      label="AsynchronousMultiple"
    ></AppAutocomplete>
  );
};
export const HasValidate = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = React.useState<IOption[]>([]);
  const [option, setOption] = React.useState<IOption[]>([]);
  const handelOnChangeOption = (e, t) => {
    setOption(t);
  };
  const handelChangeInput = (value?: any): Observable<boolean> => {
    return Observable.create((observer) => {
      return fetch(
        "https://country.register.gov.uk/records.json?page-size=5000"
      )
        .then((response) => response.json())
        .then((countries) => {
          const data = Object.keys(countries)
            .map((key) => ({
              value: countries[key].item[0]["country"],
              label: countries[key].item[0]["name"],
            }))
            .filter(
              (item) =>
                option.filter((item1) => item.value === item1.value).length ===
                0
            );
          setOptions(data);
          observer.next(true);
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
      onChangeOption={handelOnChangeOption}
      onChangeInput={handelChangeInput}
      label="AsynchronousMultiple"
    ></AppAutocomplete>
  );
};
export default { title: "Components/Form/Autocomplete" };
