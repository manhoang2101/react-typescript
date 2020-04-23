import React from "react";

export interface ITableColumn {
  label: string;
  key: string;
  renderThead?: Function;
  renderCell?: Function;
  styleThead?: React.CSSProperties;
  styleCell?: React.CSSProperties;
  pid?: string;
  rowSpanThead?: number;
  columSpanThead?: number;
  rowSpanCell?: number;
  columSpanCell?: number;
}
export type Order = "asc" | "desc";

export interface IRowSpan {
  key: string;
  break: number;
}
export interface IRenderCell {
  row: any;
  cell: any;
  value: any;
  index: number;
}
