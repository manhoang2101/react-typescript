import React from "react";
import UserContainer from "../../src/containers/user";
import GenerateData from "../generateData";
import { ITableColumn } from "../../src/components/table/type";
import { withStyles } from "@material-ui/core";
import style from "../../src/pages/user/style";
const constSchema = {
  id: "id",
  name: "name",
  cardNumber: "cardNumber",
  cardType: "cardType",
};
const initialSchema = {
  [constSchema.id]: 0,
  [constSchema.name]: "",
  [constSchema.cardNumber]: "",
  [constSchema.cardType]: "",
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
const Component = withStyles(style)(UserContainer);
export const Users = () => {
  return <Component users={data} />;
};

export default { title: "Containers/Users" };
