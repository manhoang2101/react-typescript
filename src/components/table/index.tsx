import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  WithStyles,
  withStyles,
  TablePagination,
  TableSortLabel,
} from "@material-ui/core";
import React from "react";
import style from "./style";
import { ITableColumn, Order, IRowSpan, IRenderCell } from "./type";

export interface PropsAppTable extends WithStyles<typeof style> {
  style?: React.CSSProperties;
  class?: string;
  onClickRow?: (row: number) => void;
  paging?: boolean;
  data: any[];
  columns: ITableColumn[];
  onChangePage?: (page: number) => void;
  onChangeRowsPerPage?: (perPage: number) => void;
  rowsPerPage?: number;
  perPageOptions?: number[];
  page?: number;
  count?: number;
  select?: boolean;
  sort?: boolean;
  numSelected?: number;
  onRequestSort?: (column: string) => void;
  onSelectAllClick?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  order?: Order;
  orderBy?: string;
  rowCount?: number;
  columsSort?: string[];
  rowStyle?: React.CSSProperties;
  cellStyle?: React.CSSProperties;
}

export class AppTable extends React.Component<PropsAppTable> {
  private _columSpan = 0;
  private _pColumns: any[] = [];
  private _groupColums: (ITableColumn & { childrens: ITableColumn[] })[];
  private _rowSpans: IRowSpan[] = [];
  constructor(props: Readonly<PropsAppTable>) {
    super(props);
    this._pColumns = this.props.columns.filter((item) => item.pid?.trim());
    this._groupColums = this.props.columns
      .filter((column) => !column?.pid?.trim())
      .map((column) => ({
        ...column,
        childrens: this.props.columns.filter(
          (item) => item?.pid === column.key
        ),
      }));
  }
  public renderThearParent(
    column: ITableColumn & { childrens: ITableColumn[] },
    index: number
  ) {
    const { classes } = this.props;
    return (
      <TableCell
        className={`${
          column.childrens.length > 0 && classes.topHeaderHasChildren
        } ${classes.topHeader} ${column.key}`}
        key={`thear-${index}`}
        colSpan={column.childrens.length}
        rowSpan={column.childrens.length === 0 ? 2 : 1}
        style={column.styleThear && column.styleThear}
      >
        {(column.renderThear && column.renderThear(column)) || column.label}
      </TableCell>
    );
  }
  createSortHandler(column: string) {
    const { onRequestSort } = this.props;
    onRequestSort && onRequestSort(column);
  }
  renderThear(
    column: ITableColumn & { childrens: ITableColumn[] },
    index: number
  ) {
    const { classes, sort, columsSort, order, orderBy } = this.props;
    if (column?.childrens?.length > 0) {
      return column.childrens?.map((children, index) => (
        <TableCell
          key={`thear-${index}`}
          style={children.styleThear && children.styleThear}
          className={`${children.key} ${classes.topHeaderGroup}`}
        >
          {(sort && columsSort?.includes(children.key) && (
            <TableSortLabel direction={order}>
              {(children.renderThear && children.renderThear(children)) ||
                children.label}
            </TableSortLabel>
          )) ||
            (children.renderThear && children.renderThear(children)) ||
            children.label}
        </TableCell>
      ));
    }
    return (
      <TableCell
        key={`thear-${index}`}
        style={column.styleThear && column.styleThear}
        className={`${column.key} ${
          this._pColumns.length > 0
            ? classes.topHeaderGroup
            : classes.topHeaderNotGroup
        }`}
      >
        {(sort && columsSort?.includes(column.key) && (
          <TableSortLabel
            direction={order}
            active={orderBy === column.key}
            onClick={() => this.createSortHandler(column.key)}
          >
            {(column.renderThear && column.renderThear(column)) || column.label}
            {orderBy === column.key ? (
              <span className={classes.visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </span>
            ) : null}
          </TableSortLabel>
        )) ||
          (column.renderThear && column.renderThear(column)) ||
          column.label}
      </TableCell>
    );
  }
  renderCell(
    row: any,
    column: ITableColumn & { childrens: ITableColumn[] },
    index: number
  ) {
    const converRow = row as any;
    if (column?.childrens?.length > 0) {
      return column.childrens?.map((children) => {
        const check: IRowSpan[] = this._rowSpans.filter(
          (row) => row.key === column.key
        );
        const rowSpan: IRowSpan | null = check.length > 0 ? check[0] : null;
        const cell: IRenderCell = {
          row,
          cell: children,
          value: converRow[children.key],
          index,
        };
        const data =
          (this._columSpan === 0 &&
            (rowSpan === null || rowSpan.break === 0) && (
              <TableCell
                colSpan={children.columSpanCell || 1}
                key={`cell-${index}-${children.key}`}
                className={children.key}
                onClick={() =>
                  this.props.onClickRow && this.props.onClickRow(row)
                }
                style={{
                  ...this.props.cellStyle,
                  ...children.styleCell,
                }}
              >
                {(children.renderCell && children.renderCell(cell)) ||
                  converRow[children.key]}
              </TableCell>
            )) ||
          null;
        if (this._columSpan === 0)
          this._columSpan =
            (children.columSpanCell && children.columSpanCell - 1) || 0;
        else {
          this._columSpan--;
        }
        if (rowSpan === null) {
          this._rowSpans.push({
            key: children.key,
            break: (children.rowSpanCell && children.rowSpanCell - 1) || 0,
          });
        } else {
          this._rowSpans = this._rowSpans.map((row) => {
            if (row.key === rowSpan.key) {
              const d = {
                ...row,
                break:
                  row.break === 0
                    ? (children.rowSpanCell && children.rowSpanCell - 1) || 0
                    : row.break - 1,
              };
              return d;
            } else {
              return row;
            }
          });
        }
        return data;
      });
    } else {
      const check: IRowSpan[] = this._rowSpans.filter(
        (row) => row.key === column.key
      );
      const rowSpan: IRowSpan | null = check.length > 0 ? check[0] : null;
      const cell: IRenderCell = {
        row,
        cell: column,
        value: converRow[column.key],
        index,
      };
      const data =
        (this._columSpan === 0 && (rowSpan === null || rowSpan.break === 0) && (
          <TableCell
            colSpan={column.columSpanCell || 1}
            rowSpan={column.rowSpanCell || 1}
            key={`cell-${index}-${column.key}`}
            className={column.key}
            onClick={() => this.props.onClickRow && this.props.onClickRow(row)}
            style={{
              ...this.props.cellStyle,
              ...column.styleCell,
            }}
          >
            {(column.renderCell && column.renderCell(cell)) ||
              converRow[column.key]}
          </TableCell>
        )) ||
        null;

      if (this._columSpan === 0)
        this._columSpan =
          (column.columSpanCell && column.columSpanCell - 1) || 0;
      else {
        this._columSpan--;
      }

      if (rowSpan === null) {
        this._rowSpans.push({
          key: column.key,
          break: (column.rowSpanCell && column.rowSpanCell - 1) || 0,
        });
      } else {
        this._rowSpans = this._rowSpans.map((row) => {
          if (row.key === rowSpan.key) {
            return {
              ...row,
              break:
                row.break === 0
                  ? (column.rowSpanCell && column.rowSpanCell - 1) || 0
                  : row.break - 1,
            };
          } else {
            return row;
          }
        });
      }
      return data;
    }
  }
  handleChangePage = (row: number) => {
    return this.props.onChangePage && this.props.onChangePage(row);
  };
  handleChangeRowsPerPage = (perPage: string) => {
    const per = parseInt(perPage);
    return (
      this.props.onChangeRowsPerPage && this.props.onChangeRowsPerPage(per)
    );
  };
  generateData() {
    if (this.props.paging === true) {
      const { page = 0, rowsPerPage = 0 } = this.props;
      const from = page * rowsPerPage;
      const to = from + (rowsPerPage - 1);
      return this.props.data.filter(
        (_item, index) => index >= from && index <= to
      );
    }
    return this.props.data;
  }
  render() {
    const {
      classes,
      data,
      onClickRow,
      page,
      count,
      perPageOptions,
      rowsPerPage,
    } = this.props;

    return (
      <>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple">
            <TableHead>
              {this._pColumns.length > 0 && (
                <TableRow style={this.props.rowStyle}>
                  {this._groupColums.map(
                    (
                      column: ITableColumn & { childrens: ITableColumn[] },
                      index: number
                    ) => this.renderThearParent(column, index)
                  )}
                </TableRow>
              )}

              {this._pColumns.length > 0 && (
                <TableRow style={this.props.rowStyle}>
                  {this._groupColums
                    .filter((group) => group?.childrens.length > 0)
                    .map((column, index) => this.renderThear(column, index))}
                </TableRow>
              )}

              {this._pColumns.length === 0 && (
                <TableRow style={this.props.rowStyle}>
                  {this._groupColums
                    .filter((group) => group?.childrens)
                    .map(
                      (
                        column: ITableColumn & { childrens: ITableColumn[] },
                        index: number
                      ) => this.renderThear(column, index)
                    )}
                </TableRow>
              )}
            </TableHead>
            <TableBody>
              {data &&
                this.generateData().map((item: any, index: number) => (
                  <TableRow
                    key={index}
                    onClick={() => onClickRow && onClickRow(item)}
                    style={this.props.rowStyle}
                  >
                    {this._groupColums.map((column) =>
                      this.renderCell(item, column, index)
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {this.props.paging && (
          <TablePagination
            rowsPerPageOptions={perPageOptions || [5, 10, 20]}
            component="div"
            count={(count && count) || 0}
            rowsPerPage={rowsPerPage || 10}
            page={page || 0}
            onChangePage={(_event, row: number) => this.handleChangePage(row)}
            onChangeRowsPerPage={(event) =>
              this.handleChangeRowsPerPage(event.target.value)
            }
          />
        )}
      </>
    );
  }
}

export default withStyles(style)(AppTable);
