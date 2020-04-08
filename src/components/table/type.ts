import React from "react";

export interface ITableColumn {
  label: string;
  key: string;
  renderThear?: Function;
  renderCell?: Function;
  styleThear?: React.CSSProperties;
  styleCell?: React.CSSProperties;
  pid?: string;
  rowSpanThear?: number;
  columSpanThear?: number;
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
