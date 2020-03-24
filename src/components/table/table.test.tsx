import React from "react";
import AppTable from ".";
import { shallow } from "enzyme";
import GenerateData from "../../../stories/generateData";
import { ITableColumn } from "./type";
import { create, act } from "react-test-renderer";
import { TableCell } from "@material-ui/core";
describe("UT table component", () => {
  test("render()", () => {
    const constSchema = {
      id: "id",
      name: "name",
      address: "address",
      phone: "phone",
      birthday: "birthday",
    };
    const initialSchema = {
      [constSchema.id]: 0,
      [constSchema.name]: "",
      [constSchema.address]: "",
      [constSchema.phone]: "",
      [constSchema.birthday]: new Date(),
    };
    const generateData = new GenerateData(initialSchema);
    const data = generateData.dataEXST();
    const columns: ITableColumn[] = [
      {
        label: "id",
        key: "id",
      },
      {
        label: "name",
        key: "name",
      },
      {
        label: "address",
        key: "address",
      },
      {
        label: "phone",
        key: "phone",
      },
      {
        label: "birthday",
        key: "birthday",
      },
    ];

    const component = create(<AppTable data={data} columns={columns} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
