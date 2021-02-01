import { IPagi } from './pagi';

export interface ITableFilter {
  input: string;
  checkbox: boolean;
  select: string;
  sortedInfo: {
    columnKey: string;
    order: string;
  };
  isChange: boolean;
  pagi: IPagi;
}