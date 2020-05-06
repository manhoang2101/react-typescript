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

export interface IAppSidebarProps extends WithStyles<typeof style> {
  style?: React.CSSProperties;
  class?: string;
  onClickRow?: (row: object, event?: any) => void;
  onDoubleClickRow?: (row: object, event?: any) => void;
  paging?: boolean;
  data: any[];
  columns: ITableColumn[];
  onChangePage?: (page: number, event?: any) => void;
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
  columnsSort?: string[];
  rowStyle?: React.CSSProperties;
  cellStyle?: React.CSSProperties;
}

export class AppTable extends React.Component<IAppSidebarProps> {
  private _columSpan = 0;
  private _pColumns: any[] = [];
  private _groupColumns: (ITableColumn & { children: ITableColumn[] })[];
  private _rowSpans: IRowSpan[] = [];
  constructor(props: Readonly<IAppSidebarProps>) {
    super(props);
    this._pColumns = this.props.columns.filter((item) => item.pid?.trim());
    this._groupColumns = this.props.columns
      .filter((column) => !column?.pid?.trim())
      .map((column) => ({
        ...column,
        children: this.props.columns.filter((item) => item?.pid === column.key),
      }));
    this.handleOnChangePage.bind(this);
    this.handleOnChangeRowsPerPage.bind(this);
  }
  private renderTheadParent(
    column: ITableColumn & { children: ITableColumn[] },
    index: number
  ) {
    const { classes } = this.props;
    return (
      <TableCell
        className={`${
          column.children.length > 0 && classes.topHeaderHasChildren
        } ${classes.topHeader} ${column.key} ${classes.tdThead} td-thead`}
        key={`thead-${index}`}
        colSpan={column.children.length}
        rowSpan={column.children.length === 0 ? 2 : 1}
        style={column.styleThead && column.styleThead}
      >
        {(column.renderThead && column.renderThead(column)) || column.label}
      </TableCell>
    );
  }
  private createSortHandler(column: string) {
    const { onRequestSort } = this.props;
    return onRequestSort && onRequestSort(column);
  }
  private renderThead(
    column: ITableColumn & { children: ITableColumn[] },
    index: number
  ) {
    const { classes, sort, columnsSort, order, orderBy } = this.props;
    if (column?.children?.length > 0) {
      return column.children?.map((children, index) => {
        const data = !this._columSpan && (
          <TableCell
            key={`thead-${index}`}
            style={children.styleThead && children.styleThead}
            className={`${children.key} ${classes.topHeaderGroup} ${classes.tdThead} td-thead`}
            colSpan={children.columSpanThead}
          >
            {(sort && columnsSort?.includes(children.key) && (
              <TableSortLabel
                direction={order}
                className={`sort-${children.key} sort-column`}
              >
                {(children.renderThead && children.renderThead(children)) ||
                  children.label}
              </TableSortLabel>
            )) ||
              (children.renderThead && children.renderThead(children)) ||
              children.label}
          </TableCell>
        );
        if (!this._columSpan)
          this._columSpan =
            (children.columSpanThead && children.columSpanThead - 1) || 0;
        else {
          this._columSpan--;
        }
        return data;
      });
    } else {
      const data =
        (!this._columSpan && (
          <TableCell
            key={`thead-${index}`}
            style={column.styleThead && column.styleThead}
            className={`${column.key} ${classes.tdThead} td-thead`}
            colSpan={column.columSpanThead}
          >
            {(sort && columnsSort?.includes(column.key) && (
              <TableSortLabel
                direction={order}
                active={orderBy === column.key}
                onClick={() => this.createSortHandler(column.key)}
                className={`sort-${column.key} sort-column`}
              >
                {(column.renderThead && column.renderThead(column)) ||
                  column.label}
                {orderBy === column.key ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            )) ||
              (column.renderThead && column.renderThead(column)) ||
              column.label}
          </TableCell>
        )) ||
        null;
      if (!this._columSpan)
        this._columSpan =
          (column.columSpanThead && column.columSpanThead - 1) || 0;
      else {
        this._columSpan--;
      }
      return data;
    }
  }
  private renderCell(
    row: any,
    column: ITableColumn & { children: ITableColumn[] },
    index: number
  ) {
    if (column?.children?.length > 0) {
      return column.children?.map((children) => {
        const check: IRowSpan[] = this._rowSpans.filter(
          (row) => row.key === children.key
        );
        const rowSpan: IRowSpan | null = check.length > 0 ? check[0] : null;
        const cell: IRenderCell = {
          row,
          cell: children,
          value: row[children.key],
          index,
        };
        const data =
          (!this._columSpan && (!rowSpan || !rowSpan.break) && (
            <TableCell
              colSpan={children.columSpanCell || 1}
              rowSpan={children.rowSpanCell || 1}
              key={`cell-${index}-${children.key}`}
              className={`${children.key} td-cell`}
              style={{
                ...this.props.cellStyle,
                ...children.styleCell,
              }}
            >
              {(children.renderCell && children.renderCell(cell)) ||
                row[children.key]}
            </TableCell>
          )) ||
          null;
        if (!this._columSpan)
          this._columSpan =
            (children.columSpanCell && children.columSpanCell - 1) || 0;
        else {
          this._columSpan--;
        }
        if (!rowSpan) {
          this._rowSpans.push({
            key: children.key,
            break: (children.rowSpanCell && children.rowSpanCell - 1) || 0,
          });
        } else {
          this._rowSpans = this._rowSpans.map((row) => {
            if (row.key === rowSpan.key) {
              row = {
                ...row,
                break:
                  row.break === 0
                    ? (children.rowSpanCell && children.rowSpanCell - 1) || 0
                    : row.break - 1,
              };
            }
            return row;
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
        value: row[column.key],
        index,
      };
      const data =
        (!this._columSpan && (!rowSpan || !rowSpan.break) && (
          <TableCell
            colSpan={column.columSpanCell || 1}
            rowSpan={column.rowSpanCell || 1}
            key={`cell-${index}-${column.key}`}
            className={`${column.key} td-cell`}
            style={{
              ...this.props.cellStyle,
              ...column.styleCell,
            }}
          >
            {(column.renderCell && column.renderCell(cell)) || row[column.key]}
          </TableCell>
        )) ||
        null;

      if (!this._columSpan)
        this._columSpan =
          (column.columSpanCell && column.columSpanCell - 1) || 0;
      else {
        this._columSpan--;
      }

      if (!rowSpan) {
        this._rowSpans.push({
          key: column.key,
          break: (column.rowSpanCell && column.rowSpanCell - 1) || 0,
        });
      } else {
        this._rowSpans = this._rowSpans.map((row) => {
          if (row.key === rowSpan.key) {
            row = {
              ...row,
              break:
                row.break === 0
                  ? (column.rowSpanCell && column.rowSpanCell - 1) || 0
                  : row.break - 1,
            };
          }
          return row;
        });
      }
      return data;
    }
  }
  public handleOnChangePage = (_event: any, row: number) => {
    this.props.onChangePage && this.props.onChangePage(row);
  };
  public handleOnChangeRowsPerPage = (event: any) => {
    const per = parseInt(event.target.value);
    this.props.onChangeRowsPerPage && this.props.onChangeRowsPerPage(per);
  };
  public handleOnClickRow(row: object, _event: any) {
    const { onClickRow } = this.props;
    onClickRow && onClickRow(row, _event);
  }
  public handleOnDoubleClickRow(row: object, _event: any) {
    const { onDoubleClickRow } = this.props;
    onDoubleClickRow && onDoubleClickRow(row, _event);
  }
  public generateData() {
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
      onDoubleClickRow,
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
                <TableRow style={this.props.rowStyle} className={`tr-thead`}>
                  {this._groupColumns.map(
                    (
                      column: ITableColumn & { children: ITableColumn[] },
                      index: number
                    ) => this.renderTheadParent(column, index)
                  )}
                </TableRow>
              )}

              {this._pColumns.length > 0 && (
                <TableRow style={this.props.rowStyle} className={`tr-thead`}>
                  {this._groupColumns
                    .filter((group) => group?.children.length > 0)
                    .map((column, index) => this.renderThead(column, index))}
                </TableRow>
              )}

              {this._pColumns.length === 0 && (
                <TableRow style={this.props.rowStyle} className={`tr-thead`}>
                  {this._groupColumns
                    .filter((group) => group?.children)
                    .map(
                      (
                        column: ITableColumn & { children: ITableColumn[] },
                        index: number
                      ) => this.renderThead(column, index)
                    )}
                </TableRow>
              )}
            </TableHead>
            <TableBody>
              {data &&
                this.generateData().map((item: any, index: number) => (
                  <TableRow
                    key={index}
                    onClick={(event) => this.handleOnClickRow(item, event)}
                    onDoubleClick={(event) =>
                      this.handleOnDoubleClickRow(item, event)
                    }
                    style={this.props.rowStyle}
                    className={`tr-cell ${
                      (onClickRow || onDoubleClickRow) && classes.hasClickRow
                    }`}
                  >
                    {this._groupColumns.map((column) =>
                      this.renderCell(item, column, index)
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {this.props.paging && (
          <TablePagination
            className={`app-table-pagination`}
            rowsPerPageOptions={perPageOptions || [5, 10, 20]}
            component="div"
            count={(count && count) || 0}
            rowsPerPage={rowsPerPage || 10}
            page={page || 0}
            onChangePage={this.handleOnChangePage}
            onChangeRowsPerPage={this.handleOnChangeRowsPerPage}
          />
        )}
      </>
    );
  }
}

export default withStyles(style)(AppTable);
