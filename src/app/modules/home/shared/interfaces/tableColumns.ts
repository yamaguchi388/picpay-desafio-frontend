import { TableColumnType } from "../enums";

export interface ITableColumns {
  key: string;
  displayName: string;
  type?: TableColumnType;
}
