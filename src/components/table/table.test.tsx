import React from "react";
import AppTable from ".";
import GenerateData from "../../../storybook/generateData";
import { ITableColumn } from "./type";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { shallow, mount } from "enzyme";
import style from "./style";
import { withStyles } from "@material-ui/core";

describe("<TableCell />", () => {
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
  const data = generateData.dataEXST(2);
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
  const Component = withStyles(style)(AppTable);
  // ! test case function
  describe("should be function renderTheadParent", () => {
    test("should be show label header", () => {
      const { container } = render(
        <Component
          data={data}
          columns={columns}
          onClickRow={(row) => console.log(row)}
        />
      );
      const ths = container.getElementsByTagName("th");
      columns.map((column, key) =>
        expect(ths[key].textContent).toBe(column.label)
      );
      const trs = container.getElementsByClassName("tr-cell");
      expect(trs.length).toBe(data.length);
    });
    describe("should be group", () => {
      test("should be show label group header", () => {
        const columnGroup = [...columns];
        columnGroup[1] = { ...columnGroup[1], pid: "top1" };
        columnGroup[2] = { ...columnGroup[2], pid: "top1" };
        columnGroup[3] = { ...columnGroup[3], pid: "top2" };
        columnGroup[4] = { ...columnGroup[4], pid: "top2" };
        columnGroup.push({
          key: "top1",
          label: "Group 1",
        });
        columnGroup.push({
          key: "top2",
          label: "Group 2",
        });
        const { container } = render(
          <Component
            data={data}
            columns={columnGroup}
            onClickRow={(row) => console.log(row)}
          />
        );
        const trs = container
          .getElementsByTagName("thead")
          .item(0)
          ?.getElementsByTagName("tr");
        const trGroup0 = trs?.item(0);
        const trGroup1 = trs?.item(1);
        let ths = trGroup0?.getElementsByTagName("th");
        expect(ths?.item(0)?.textContent).toBe(columnGroup[0].label);
        expect(ths?.item(1)?.textContent).toBe("Group 1");
        expect(ths?.item(2)?.textContent).toBe("Group 2");

        ths = trGroup1?.getElementsByTagName("th");
        expect(ths?.item(0)?.textContent).toBe("name");
        expect(ths?.item(1)?.textContent).toBe("address");
        expect(ths?.item(2)?.textContent).toBe("phone");
        expect(ths?.item(3)?.textContent).toBe("birthday");
      });

      test("should be show label group header has styleThead", () => {
        const columnGroup = [...columns];
        columnGroup[1] = { ...columnGroup[1], pid: "top1" };
        columnGroup[2] = { ...columnGroup[2], pid: "top1" };
        columnGroup[3] = { ...columnGroup[3], pid: "top2" };
        columnGroup[4] = { ...columnGroup[4], pid: "top2" };
        columnGroup.push({
          key: "top1",
          label: "Group 1",
          styleThead: {
            background: "#cccccc",
          },
        });
        columnGroup.push({
          key: "top2",
          label: "Group 2",
          styleThead: {
            background: "#000000",
            color: "yellow",
          },
        });
        const { container } = render(
          <Component
            data={data}
            columns={columnGroup}
            onClickRow={(row) => console.log(row)}
          />
        );
        const trs = container
          .getElementsByTagName("thead")
          .item(0)
          ?.getElementsByTagName("tr");
        const trGroup = trs?.item(0);
        let ths = trGroup?.getElementsByTagName("th");
        const css1 = ths?.item(1)?.getAttribute("style");
        const css2 = ths?.item(2)?.getAttribute("style");
        expect(css1).toBe("background: rgb(204, 204, 204);");
        expect(css2).toBe("background: rgb(0, 0, 0); color: yellow;");
      });

      test("should be show label group header has renderThead()", () => {
        const columnGroup = [...columns];
        columnGroup[1] = { ...columnGroup[1], pid: "top1" };
        columnGroup[2] = { ...columnGroup[2], pid: "top1" };
        columnGroup[3] = { ...columnGroup[3], pid: "top2" };
        columnGroup[4] = { ...columnGroup[4], pid: "top2" };
        columnGroup.push({
          key: "top1",
          label: "Group 1",
          renderThead: () => "renderThead Group 1",
        });
        columnGroup.push({
          key: "top2",
          label: "Group 2",
          renderThead: () => "renderThead Group 2",
        });
        const { container } = render(
          <Component
            data={data}
            columns={columnGroup}
            onClickRow={(row) => console.log(row)}
          />
        );
        const trs = container
          .getElementsByTagName("thead")
          .item(0)
          ?.getElementsByTagName("tr");
        const trGroup = trs?.item(0);
        let ths = trGroup?.getElementsByTagName("th");
        expect(ths?.item(1)?.textContent).toBe("renderThead Group 1");
        expect(ths?.item(2)?.textContent).toBe("renderThead Group 2");
      });
    });
  });
  describe("should be function renderThead", () => {
    test("should be colSpan header", () => {
      const columnSolSpan = [...columns];
      columnSolSpan[1] = { ...columnSolSpan[1], columSpanThead: 2 };
      const { container } = render(
        <Component
          data={data}
          columns={columnSolSpan}
          onClickRow={(row) => console.log(row)}
        />
      );
      const colSpan = container.querySelectorAll('.td-thead[colspan="2"]');
      expect(colSpan.length).toBe(1);
    });

    test("should be colSpan has Group header", () => {
      const columnGroup = [...columns];
      columnGroup[1] = { ...columnGroup[1], pid: "top1", columSpanThead: 2 };
      columnGroup[2] = { ...columnGroup[2], pid: "top1" };
      columnGroup[3] = { ...columnGroup[3], pid: "top2" };
      columnGroup[4] = { ...columnGroup[4], pid: "top2" };
      columnGroup.push({
        key: "top1",
        label: "Group 1",
      });
      columnGroup.push({
        key: "top2",
        label: "Group 2",
      });
      const { container } = render(
        <Component
          data={data}
          columns={columnGroup}
          onClickRow={(row) => console.log(row)}
        />
      );
      const colSpan = container.querySelectorAll('.name.td-thead[colspan="2"]');
      expect(colSpan.length).toBe(1);
    });

    test("should be styleThead header", () => {
      const columnGroup = [...columns];
      columnGroup[1] = {
        ...columnGroup[1],
        styleThead: {
          background: "yellow",
        },
      };
      const { container } = render(
        <Component
          data={data}
          columns={columnGroup}
          onClickRow={(row) => console.log(row)}
        />
      );
      const style = container
        .querySelector(".name.td-thead")
        ?.getAttribute("style");
      expect(style).toBe("background: yellow;");
    });

    test("should be colSpan has Group, styleThead header", () => {
      const columnGroup = [...columns];
      columnGroup[1] = {
        ...columnGroup[1],
        pid: "top1",
        columSpanThead: 2,
        styleThead: {
          background: "yellow",
        },
      };
      columnGroup[2] = {
        ...columnGroup[2],
        pid: "top1",
      };
      columnGroup[3] = { ...columnGroup[3], pid: "top2" };
      columnGroup[4] = { ...columnGroup[4], pid: "top2" };
      columnGroup.push({
        key: "top1",
        label: "Group 1",
      });
      columnGroup.push({
        key: "top2",
        label: "Group 2",
      });
      const { container } = render(
        <Component
          data={data}
          columns={columnGroup}
          onClickRow={(row) => console.log(row)}
        />
      );
      const style = container
        .querySelector(".name.td-thead")
        ?.getAttribute("style");
      expect(style).toBe("background: yellow;");
    });

    test("should be renderThead header", () => {
      const columnGroup = [...columns];
      columnGroup[1] = {
        ...columnGroup[1],
        renderThead: () => "renderThead",
      };
      const { container } = render(
        <Component
          data={data}
          columns={columnGroup}
          onClickRow={(row) => console.log(row)}
        />
      );
      const innerHTML = container.querySelector(".name.td-thead")?.innerHTML;
      expect(innerHTML).toBe("renderThead");
    });

    test("should be header has renderThead", () => {
      const columnGroup = [...columns];
      columnGroup[1] = { ...columnGroup[1], renderThead: () => "renderThead" };
      const { container } = render(
        <Component
          data={[data[0]]}
          columns={columnGroup}
          onClickRow={(row) => console.log(row)}
        />
      );
      const ths = container
        .getElementsByTagName("thead")
        .item(0)
        ?.getElementsByTagName("tr")
        .item(0)
        ?.getElementsByTagName("th");
      expect(ths?.item(1)?.textContent).toBe("renderThead");
    });

    test("should be colSpan has Group, renderThead header", () => {
      const columnGroup = [...columns];
      columnGroup[1] = {
        ...columnGroup[1],
        pid: "top1",
        renderThead: () => "renderThead",
      };
      columnGroup[2] = {
        ...columnGroup[2],
        pid: "top1",
      };
      columnGroup[3] = { ...columnGroup[3], pid: "top2" };
      columnGroup[4] = { ...columnGroup[4], pid: "top2" };
      columnGroup.push({
        key: "top1",
        label: "Group 1",
      });
      columnGroup.push({
        key: "top2",
        label: "Group 2",
      });
      const { container } = render(
        <Component
          data={data}
          columns={columnGroup}
          onClickRow={(row) => console.log(row)}
        />
      );
      const ths = container
        .getElementsByTagName("thead")
        .item(0)
        ?.getElementsByTagName("tr")
        .item(1)
        ?.getElementsByTagName("th");
      expect(ths?.item(0)?.textContent).toBe("renderThead");
    });

    test("should be header has Sorting renderThead", () => {
      const columnGroup = [...columns];
      columnGroup[1] = { ...columnGroup[1], renderThead: () => "renderThead" };
      const { container } = render(
        <Component
          data={data}
          columns={columns}
          onClickRow={(row) => console.log(row)}
          sort={true}
          columnsSort={["name", "address"]}
          order={"desc"}
          orderBy={"name"}
        />
      );
      const sortingColumns = container.querySelectorAll(".sort-column");
      expect(sortingColumns.length).toBe(2);
    });

    test("should be header has Sorting order asc", () => {
      const { container } = render(
        <Component
          data={data}
          columns={columns}
          onClickRow={(row) => console.log(row)}
          sort={true}
          columnsSort={["name", "address"]}
          order={"asc"}
          orderBy={"name"}
        />
      );
      const sortingColumns = container.querySelectorAll(".sort-column");
      expect(sortingColumns.length).toBe(2);
    });

    test("should be header has Sorting renderThead", () => {
      const columnGroup = [...columns];
      columnGroup[1] = {
        ...columnGroup[1],
        renderThead: () => "renderThead",
      };
      columnGroup[2] = {
        ...columnGroup[2],
        renderThead: () => "renderThead",
      };
      const { container } = render(
        <Component
          data={data}
          columns={columnGroup}
          onClickRow={(row) => console.log(row)}
          sort={true}
          columnsSort={["name", "address"]}
          order={"asc"}
          orderBy={"name"}
        />
      );
      const sortingColumns = container.querySelectorAll(".sort-column");
      expect(sortingColumns.length).toBe(2);
    });

    test("should be colSpan has Group header has Sorting ", () => {
      const columnGroup = [...columns];
      columnGroup[1] = {
        ...columnGroup[1],
        pid: "top1",
        columSpanThead: 2,
        styleThead: {
          background: "yellow",
        },
      };
      columnGroup[2] = {
        ...columnGroup[2],
        pid: "top1",
      };
      columnGroup[3] = { ...columnGroup[3], pid: "top2" };
      columnGroup[4] = { ...columnGroup[4], pid: "top2" };
      columnGroup.push({
        key: "top1",
        label: "Group 1",
      });
      columnGroup.push({
        key: "top2",
        label: "Group 2",
      });
      const { container } = render(
        <Component
          data={data}
          columns={columnGroup}
          onClickRow={(row) => console.log(row)}
          sort={true}
          columnsSort={["name"]}
        />
      );
      const name = container.querySelectorAll(".sort-name");
      expect(name.length).toBe(1);
    });

    test("should be colSpan has Group header has Sorting as renderThead ", () => {
      const columnGroup = [...columns];
      columnGroup[1] = {
        ...columnGroup[1],
        pid: "top1",
        columSpanThead: 2,
        styleThead: {
          background: "yellow",
        },
        renderThead: () => "renderThead",
      };
      columnGroup[2] = {
        ...columnGroup[2],
        pid: "top1",
      };
      columnGroup[3] = { ...columnGroup[3], pid: "top2" };
      columnGroup[4] = { ...columnGroup[4], pid: "top2" };
      columnGroup.push({
        key: "top1",
        label: "Group 1",
      });
      columnGroup.push({
        key: "top2",
        label: "Group 2",
      });
      const { container } = render(
        <Component
          data={data}
          columns={columnGroup}
          onClickRow={(row) => console.log(row)}
          sort={true}
          columnsSort={["name"]}
        />
      );
      const name = container.querySelectorAll(".sort-name");
      expect(name.length).toBe(1);
    });

    test("should be on click sort", () => {
      const handleOnSorted = jest.fn();
      const container = mount(
        <Component
          data={data}
          columns={columns}
          onClickRow={(row) => console.log(row)}
          sort={true}
          columnsSort={["name"]}
          onRequestSort={handleOnSorted}
        />
      );
      container.find(".sort-name").at(0).simulate("click");
      expect(handleOnSorted).toHaveBeenCalled();
    });
  });
  describe("should be function renderCell", () => {
    test("should be colspan", () => {
      const colspanColumns = columns;
      colspanColumns[1] = { ...colspanColumns[1], columSpanCell: 2 };
      const { container } = render(
        <Component
          data={[data[0]]}
          columns={colspanColumns}
          onClickRow={(row) => console.log(row)}
        />
      );
      const tds = container
        .getElementsByTagName("tbody")
        .item(0)
        ?.getElementsByTagName("tr")
        .item(0)
        ?.getElementsByTagName("td");
      const input = tds?.item(1)?.getAttribute("colspan");
      expect(input).toBe("2");
    });

    test("should be colspan has group", () => {
      const columnGroup = [...columns];
      columnGroup[1] = {
        ...columnGroup[1],
        pid: "top1",
        columSpanThead: 2,
        styleThead: {
          background: "yellow",
        },
        columSpanCell: 2,
      };
      columnGroup[2] = {
        ...columnGroup[2],
        pid: "top1",
      };
      columnGroup[3] = { ...columnGroup[3], pid: "top2" };
      columnGroup[4] = { ...columnGroup[4], pid: "top2" };
      columnGroup.push({
        key: "top1",
        label: "Group 1",
      });
      columnGroup.push({
        key: "top2",
        label: "Group 2",
      });
      const { container } = render(
        <Component
          data={[data[0]]}
          columns={columnGroup}
          onClickRow={(row) => console.log(row)}
        />
      );
      const tds = container
        .getElementsByTagName("tbody")
        .item(0)
        ?.getElementsByTagName("tr")
        .item(0)
        ?.getElementsByTagName("td");
      const input = tds?.item(1)?.getAttribute("colspan");
      expect(input).toBe("2");
    });

    test("should be rowspan", () => {
      const colspanColumns = columns;
      colspanColumns[1] = {
        ...colspanColumns[1],
        rowSpanCell: 2,
        renderCell: () => "renderCell",
      };
      const { container } = render(
        <Component
          data={data}
          columns={colspanColumns}
          onClickRow={(row) => console.log(row)}
        />
      );
      const tds = container
        .getElementsByTagName("tbody")
        .item(0)
        ?.getElementsByTagName("tr")
        .item(0)
        ?.getElementsByTagName("td");
      const input = tds?.item(1)?.getAttribute("rowspan");
      expect(input).toBe("2");
    });

    test("should be rowspan has group", () => {
      const columnGroup = [...columns];
      columnGroup[1] = {
        ...columnGroup[1],
        pid: "top1",
        columSpanThead: 2,
        styleThead: {
          background: "yellow",
        },
        renderCell: () => "renderCell",
      };
      columnGroup[2] = {
        ...columnGroup[2],
        pid: "top1",
      };
      columnGroup[3] = { ...columnGroup[3], pid: "top2" };
      columnGroup[4] = { ...columnGroup[4], pid: "top2" };
      columnGroup.push({
        key: "top1",
        label: "Group 1",
      });
      columnGroup.push({
        key: "top2",
        label: "Group 2",
      });
      columnGroup[1] = { ...columnGroup[1], rowSpanCell: 2 };
      const { container } = render(
        <Component
          data={data}
          columns={columnGroup}
          onClickRow={(row) => console.log(row)}
        />
      );
      const tds = container
        .getElementsByTagName("tbody")
        .item(0)
        ?.getElementsByTagName("tr")
        .item(0)
        ?.getElementsByTagName("td");
      const input = tds?.item(1)?.getAttribute("rowspan");
      expect(input).toBe("2");
    });

    test("should be has on click onClickRow", () => {
      const colspanColumns = columns;
      const handleOnClickRow = jest.fn();
      colspanColumns[1] = {
        ...colspanColumns[1],
        rowSpanCell: 2,
        renderCell: () => "renderCell",
      };
      const container = mount(
        <Component
          data={data}
          columns={colspanColumns}
          onClickRow={handleOnClickRow}
        />
      );
      const tr = container.find(".tr-cell").at(0);
      tr.simulate("click");
      expect(handleOnClickRow).toHaveBeenCalled();
    });
    test("should be has on click onDoubleClickRow", () => {
      const colspanColumns = columns;
      const handleOnDoubleClickRow = jest.fn();
      colspanColumns[1] = {
        ...colspanColumns[1],
        rowSpanCell: 2,
        renderCell: () => "renderCell",
      };
      const container = mount(
        <Component
          data={data}
          columns={colspanColumns}
          onDoubleClickRow={handleOnDoubleClickRow}
        />
      );
      const tr = container.find(".tr-cell").at(0);
      tr.simulate("dblclick");
      expect(handleOnDoubleClickRow).toHaveBeenCalled();
    });
  });

  describe("should be table has Pagination", () => {
    test("should call", () => {
      const { container } = render(
        <Component
          data={data}
          columns={columns}
          onClickRow={(row) => console.log(row)}
          paging={true}
          page={0}
          count={data.length}
        />
      );
      const pagination = container.querySelectorAll(".app-table-pagination");
      expect(pagination.length).toBe(1);
    });
    test("should call not prop page", () => {
      const { container } = render(
        <Component
          data={data}
          columns={columns}
          onClickRow={(row) => console.log(row)}
          paging={true}
        />
      );
      const pagination = container.querySelectorAll(".app-table-pagination");
      expect(pagination.length).toBe(1);
    });

    test("should call action", () => {
      const handleOnChangePage = jest.fn();
      const handleOnChangeRowsPerPage = jest.fn();
      const container = shallow(
        <Component
          data={data}
          columns={columns}
          onClickRow={(row) => console.log(row)}
          paging={true}
          page={0}
          count={data.length}
          onChangePage={handleOnChangePage}
          onChangeRowsPerPage={handleOnChangeRowsPerPage}
          perPageOptions={[10, 20, 30]}
        />
      )
        .dive()
        .dive()
        .instance();
      const event = {
        target: {
          value: 1,
        },
      };
      container.handleOnChangePage(null, 1);
      container.handleOnChangeRowsPerPage(event);
      expect(handleOnChangePage).toHaveBeenCalled();
      expect(handleOnChangeRowsPerPage).toHaveBeenCalled();
    });
  });
});
