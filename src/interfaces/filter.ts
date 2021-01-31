export interface ITableFilter {
  input: string;
  checkbox: boolean;
  select: string;
  sortedInfo: {
    columnKey: string;
    order: string;
  };
}