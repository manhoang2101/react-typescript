import React, { useState } from "react";
import AppTable from "../../src/components/table";
import GenerateData from "../generateData";
import {
  ITableColumn,
  IRenderCell,
  Order,
} from "../../src/components/table/type";

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

const columnsGroupHeader: ITableColumn[] = [
  {
    label: "id",
    key: "id",
  },
  {
    label: "Group 1",
    key: "top1",
    styleThead: {
      background: "#000",
      color: "yellow",
    },
  },
  {
    label: "Group 2",
    key: "top2",
  },
  {
    label: "name",
    key: "name",
    pid: "top1",
  },
  {
    label: "address",
    key: "address",
    pid: "top1",
  },
  {
    label: "phone",
    key: "phone",
    pid: "top2",
  },
  {
    label: "birthday",
    key: "birthday",
    pid: "top2",
  },
];

const columnsColSpan: ITableColumn[] = [
  {
    label: "id",
    key: "id",
  },
  {
    label: "name",
    key: "name",
    columSpanCell: 2,
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

const columnsRowspan: ITableColumn[] = [
  {
    label: "id",
    key: "id",
  },
  {
    label: "Group 1",
    key: "top1",
    styleThead: {
      background: "#000",
      color: "yellow",
    },
  },
  {
    label: "name",
    key: "name",
    rowSpanCell: 2,
    pid: "top1",
  },
  {
    label: "address",
    key: "address",
  },
  {
    label: "phone",
    key: "phone",
    rowSpanCell: 2,
    pid: "top1",
  },
  {
    label: "birthday",
    key: "birthday",
  },
];
const columnsPaging: ITableColumn[] = [
  {
    label: "#",
    key: "#",
    renderCell: (cell: IRenderCell) => {
      return cell.index + 1;
    },
  },
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
const columnsSpanThead: ITableColumn[] = [
  {
    label: "id",
    key: "id",
  },
  {
    label: "name",
    key: "name",
    columSpanThead: 2,
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

export const SampleTable = () => {
  return <AppTable columns={columns} data={data}></AppTable>;
};

export const TableGroupHeader = () => {
  return (
    <AppTable
      columns={columnsGroupHeader}
      data={data}
      sort={true}
      columnsSort={["name", "address"]}
    ></AppTable>
  );
};
export const TableColSpan = () => {
  return (
    <AppTable
      columns={columnsColSpan}
      data={data}
      cellStyle={{ border: "1px solid #cccc" }}
    ></AppTable>
  );
};

export const TableRowSpan = () => {
  return (
    <AppTable
      columns={columnsRowspan}
      data={data}
      rowStyle={{ border: "1px solid #cccc" }}
      cellStyle={{ border: "1px solid #cccc" }}
    ></AppTable>
  );
};

const datas = generateData.dataEXST(60);

export const TableHasPaging = () => {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const handlerRowsPerPage = (event) => {
    setPage(0);
    setPerPage(event);
  };
  const handlerOnChangePage = (page) => {
    setPage(page);
  };
  return (
    <AppTable
      columns={columnsPaging}
      data={datas}
      rowStyle={{ border: "1px solid #cccc" }}
      cellStyle={{ border: "1px solid #cccc" }}
      paging={true}
      page={page}
      count={datas.length}
      rowsPerPage={perPage}
      onChangeRowsPerPage={handlerRowsPerPage}
      onChangePage={handlerOnChangePage}
    ></AppTable>
  );
};

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
export const TableHasSort = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [onData, setonData] = useState(data);
  const [orderBy, setOrderBy] = useState("name");

  const handleRequestSort = (column) => {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
    setonData(stableSort(onData, getComparator(order, orderBy)));
  };
  return (
    <AppTable
      columns={columnsPaging}
      data={onData}
      rowStyle={{ border: "1px solid #cccc" }}
      cellStyle={{ border: "1px solid #cccc" }}
      columnsSort={["name", "phone"]}
      sort={true}
      order={order}
      orderBy={orderBy}
      onRequestSort={handleRequestSort}
    ></AppTable>
  );
};

export const TableColumnsSpanThead = () => {
  return (
    <AppTable
      columns={columnsSpanThead}
      data={data}
      rowStyle={{ border: "1px solid #cccc" }}
      cellStyle={{ border: "1px solid #cccc" }}
    ></AppTable>
  );
};

export const TableOnClickRow = () => {
  return (
    <AppTable
      columns={columnsSpanThead}
      data={data}
      rowStyle={{ border: "1px solid #cccc" }}
      cellStyle={{ border: "1px solid #cccc" }}
      onClickRow={(row) => alert(`onClickRow :` + JSON.stringify(row))}
    ></AppTable>
  );
};
export const TableonDoubleClickRow = () => {
  return (
    <AppTable
      columns={columnsSpanThead}
      data={data}
      rowStyle={{ border: "1px solid #cccc" }}
      cellStyle={{ border: "1px solid #cccc" }}
      onDoubleClickRow={(row) =>
        alert(`onDoubleClickRow :` + JSON.stringify(row))
      }
    ></AppTable>
  );
};
export default { title: "Components/Table" };
