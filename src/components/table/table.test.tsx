import React from "react";
import AppTable from ".";
import GenerateData from "../../../stories/generateData";
import { ITableColumn, IRenderCell, Order } from "./type";
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
  const Component = withStyles(style)(AppTable);
  // ! test case function
  test("toMatchSnapshot()", () => {
    const container = shallow(
      <Component
        data={data}
        columns={columns}
        onClickRow={(row) => console.log(row)}
      />
    );
    expect(container).toMatchSnapshot();
  });
  describe("should be function renderThearParent", () => {
    test("should be show lable header", () => {
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
      test("should be show lable group header", () => {
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

      test("should be show lable group header has styleThear", () => {
        const columnGroup = [...columns];
        columnGroup[1] = { ...columnGroup[1], pid: "top1" };
        columnGroup[2] = { ...columnGroup[2], pid: "top1" };
        columnGroup[3] = { ...columnGroup[3], pid: "top2" };
        columnGroup[4] = { ...columnGroup[4], pid: "top2" };
        columnGroup.push({
          key: "top1",
          label: "Group 1",
          styleThear: {
            background: "#cccccc",
          },
        });
        columnGroup.push({
          key: "top2",
          label: "Group 2",
          styleThear: {
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

      test("should be show lable group header has renderThear()", () => {
        const columnGroup = [...columns];
        columnGroup[1] = { ...columnGroup[1], pid: "top1" };
        columnGroup[2] = { ...columnGroup[2], pid: "top1" };
        columnGroup[3] = { ...columnGroup[3], pid: "top2" };
        columnGroup[4] = { ...columnGroup[4], pid: "top2" };
        columnGroup.push({
          key: "top1",
          label: "Group 1",
          renderThear: () => "renderThear Group 1",
        });
        columnGroup.push({
          key: "top2",
          label: "Group 2",
          renderThear: () => "renderThear Group 2",
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
        expect(ths?.item(1)?.textContent).toBe("renderThear Group 1");
        expect(ths?.item(2)?.textContent).toBe("renderThear Group 2");
      });
    });
  });
  describe("should be function renderThear", () => {
    test("should be colSpan header", () => {
      const columnSolSpan = [...columns];
      columnSolSpan[1] = { ...columnSolSpan[1], columSpanThear: 2 };
      const { container } = render(
        <Component
          data={data}
          columns={columnSolSpan}
          onClickRow={(row) => console.log(row)}
        />
      );
      const colSpan = container.querySelectorAll('.td-thear[colspan="2"]');
      expect(colSpan.length).toBe(1);
    });

    test("should be colSpan has Group header", () => {
      const columnGroup = [...columns];
      columnGroup[1] = { ...columnGroup[1], pid: "top1", columSpanThear: 2 };
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
      const colSpan = container.querySelectorAll('.name.td-thear[colspan="2"]');
      expect(colSpan.length).toBe(1);
    });

    test("should be styleThear header", () => {
      const columnGroup = [...columns];
      columnGroup[1] = {
        ...columnGroup[1],
        styleThear: {
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
        .querySelector(".name.td-thear")
        ?.getAttribute("style");
      expect(style).toBe("background: yellow;");
    });

    test("should be colSpan has Group, styleThear header", () => {
      const columnGroup = [...columns];
      columnGroup[1] = {
        ...columnGroup[1],
        pid: "top1",
        columSpanThear: 2,
        styleThear: {
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
        .querySelector(".name.td-thear")
        ?.getAttribute("style");
      expect(style).toBe("background: yellow;");
    });

    test("should be renderThear header", () => {
      const columnGroup = [...columns];
      columnGroup[1] = {
        ...columnGroup[1],
        renderThear: () => "renderThear",
      };
      const { container } = render(
        <Component
          data={data}
          columns={columnGroup}
          onClickRow={(row) => console.log(row)}
        />
      );
      const innerHTML = container.querySelector(".name.td-thear")?.innerHTML;
      expect(innerHTML).toBe("renderThear");
    });

    test("should be header has renderThear", () => {
      const columnGroup = [...columns];
      columnGroup[1] = { ...columnGroup[1], renderThear: () => "renderThear" };
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
      expect(ths?.item(1)?.textContent).toBe("renderThear");
    });

    test("should be colSpan has Group, renderThear header", () => {
      const columnGroup = [...columns];
      columnGroup[1] = {
        ...columnGroup[1],
        pid: "top1",
        renderThear: () => "renderThear",
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
      expect(ths?.item(0)?.textContent).toBe("renderThear");
    });

    test("should be header has Sorting renderThear", () => {
      const columnGroup = [...columns];
      columnGroup[1] = { ...columnGroup[1], renderThear: () => "renderThear" };
      const { container } = render(
        <Component
          data={data}
          columns={columns}
          onClickRow={(row) => console.log(row)}
          sort={true}
          columsSort={["name", "address"]}
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
          columsSort={["name", "address"]}
          order={"asc"}
          orderBy={"name"}
        />
      );
      const sortingColumns = container.querySelectorAll(".sort-column");
      expect(sortingColumns.length).toBe(2);
    });

    test("should be header has Sorting renderThear", () => {
      const columnGroup = [...columns];
      columnGroup[1] = {
        ...columnGroup[1],
        renderThear: () => "renderThear",
      };
      columnGroup[2] = {
        ...columnGroup[2],
        renderThear: () => "renderThear",
      };
      const { container } = render(
        <Component
          data={data}
          columns={columnGroup}
          onClickRow={(row) => console.log(row)}
          sort={true}
          columsSort={["name", "address"]}
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
        columSpanThear: 2,
        styleThear: {
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
          columsSort={["name"]}
        />
      );
      const name = container.querySelectorAll(".sort-name");
      expect(name.length).toBe(1);
    });

    test("should be colSpan has Group header has Sorting as renderThear ", () => {
      const columnGroup = [...columns];
      columnGroup[1] = {
        ...columnGroup[1],
        pid: "top1",
        columSpanThear: 2,
        styleThear: {
          background: "yellow",
        },
        renderThear: () => "renderThear",
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
          columsSort={["name"]}
        />
      );
      const name = container.querySelectorAll(".sort-name");
      expect(name.length).toBe(1);
    });

    test("should be on click sort", () => {
      const hendleOnSorted = jest.fn();
      const container = mount(
        <Component
          data={data}
          columns={columns}
          onClickRow={(row) => console.log(row)}
          sort={true}
          columsSort={["name"]}
          onRequestSort={hendleOnSorted}
        />
      );
      container.find(".sort-name").at(0).simulate("click");
      expect(hendleOnSorted).toHaveBeenCalled();
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
        columSpanThear: 2,
        styleThear: {
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
        columSpanThear: 2,
        styleThear: {
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
      const hendleOnClickRow = jest.fn();
      colspanColumns[1] = {
        ...colspanColumns[1],
        rowSpanCell: 2,
        renderCell: () => "renderCell",
      };
      const container = mount(
        <Component
          data={data}
          columns={colspanColumns}
          onClickRow={hendleOnClickRow}
        />
      );
      const tr = container.find(".tr-cell").at(0);
      tr.simulate("click");
      expect(hendleOnClickRow).toHaveBeenCalled();
    });

    test("should be has on click onClickRow has group", () => {
      const columnGroup = [...columns];
      columnGroup[1] = {
        ...columnGroup[1],
        pid: "top1",
        columSpanThear: 2,
        styleThear: {
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
      columnGroup[1] = {
        ...columnGroup[1],
        rowSpanCell: 2,
        renderCell: () => "renderCell",
      };
      const hendleOnClickRow = jest.fn();
      const container = mount(
        <Component
          data={data}
          columns={columnGroup}
          onClickRow={hendleOnClickRow}
        />
      );
      const tr = container.find(".tr-cell").at(0);
      tr.simulate("click");
      expect(hendleOnClickRow).toHaveBeenCalled();
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
      const handelOnChangePage = jest.fn();
      const handelOnChangeRowsPerPage = jest.fn();
      const container = shallow(
        <Component
          data={data}
          columns={columns}
          onClickRow={(row) => console.log(row)}
          paging={true}
          page={0}
          count={data.length}
          onChangePage={handelOnChangePage}
          onChangeRowsPerPage={handelOnChangeRowsPerPage}
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
      container.handleChangePage(null, 1);
      container.handleChangeRowsPerPage(event);
      expect(handelOnChangePage).toHaveBeenCalled();
      expect(handelOnChangeRowsPerPage).toHaveBeenCalled();
    });
  });
});
