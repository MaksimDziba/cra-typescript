import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Table as AntTable, Button } from 'antd';
import { People } from '../../interfaces/people';
import { ITableFilter } from '../../interfaces/filter';
import { ModalTable } from '../Modals/ModalTable';
import { useTable, useSortBy } from 'react-table';
import ReactSpinnerTimer from 'react-spinner-timer';

import styles from './Table.module.scss';

interface ITableProps {
  isLoading: boolean;
  dataRow: People[];
  callbackRefreshDataTable: () => void;
  callbackTableData: (pagi: any, data: Array<People>) => void;
}

const Table = ({ isLoading, dataRow, callbackRefreshDataTable, callbackTableData }: ITableProps) => {
  const initData = dataRow;
  const initFilter = {
    input: '',
    checkbox: false,
    select: '',
    sortedInfo: { columnKey: '', order: 'descend' },
    isChange: false,
    pagi: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  };
  const [showModal, setShowModal] = useState<boolean>(false);
  const [data, setDataRow] = useState<People[]>([]);
  const [filter, setFilter] = useState<ITableFilter>(initFilter);

  const handleResetFilter = (): void => setFilter(initFilter);

  const handleShowModal = (): void => setShowModal((prev) => !prev);

  const handleChange = (pagination: any, filters: any, sorter: any, extra: any): void => {
    const { currentDataSource } = extra;
    const serializeCurData = currentDataSource.map((item: any) => item.original);
    callbackTableData(pagination, serializeCurData);
    setFilter({ ...filter, sortedInfo: sorter, pagi: pagination });
  };

  const handleTableFilter = (modalFilter: ITableFilter): void => {
    setFilter({
      ...modalFilter,
      select: modalFilter.select,
      sortedInfo: { columnKey: modalFilter.select, order: 'des' },
    });
  };

  const handleChangeSpinner = (lap: any): void => {
    if (lap.isFinish) console.log('Finished!!');
    else callbackRefreshDataTable();
  };

  const columns: any = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: ['values', 'name'],
        key: 'name',
        accessor: 'name',
      },
      {
        title: 'Height',
        dataIndex: ['values', 'height'],
        key: 'height',
        accessor: 'height',
        sorter: (a: any, b: any) => parseInt(a.values.height) - parseInt(b.values.height),
        sortOrder: filter.sortedInfo.columnKey === 'height',
        ellipsis: true,
      },
      {
        title: 'Eye color',
        dataIndex: ['values', 'eye_color'],
        key: 'eye_color',
        accessor: 'eye_color',
        sorter: (a: any, b: any) => {
          if (a.values.eye_color < b.values.eye_color) {
            return -1;
          }
          if (a.values.eye_color > b.values.eye_color) {
            return 1;
          }
          return 0;
        },
        sortOrder: filter.sortedInfo.columnKey === 'eye_color',
        ellipsis: true,
      },
      {
        title: 'Birth year',
        dataIndex: ['values', 'birth_year'],
        key: 'birth_year',
        accessor: 'birth_year',
        sorter: (a: any, b: any) => {
          if (a.values.birth_year < b.values.birth_year) {
            return -1;
          }
          if (a.values.birth_year > b.values.birth_year) {
            return 1;
          }
          return 0;
        },
        sortOrder: filter.sortedInfo.columnKey === 'birth_year',
      },
    ],
    [filter],
  );

  const { rows, state: useTableState, toggleHideColumn } = useTable({ columns, data }, useSortBy);
  const columnsDisplay = columns.filter((initCol: any) => useTableState.hiddenColumns?.indexOf(initCol.key));

  const filterTable = useCallback(() => {
    // filter by name
    if (filter.input.trim() !== '') {
      const newDataRow: People[] = initData.filter(
        (people: People) => people.name.toLowerCase().indexOf(filter.input) > -1,
      );
      setDataRow(newDataRow);
    } else {
      setDataRow(initData);
    }
    // hide table column
    if (filter.checkbox) toggleHideColumn('birth_year', true);
  }, [filter, initData, toggleHideColumn]);

  useEffect(() => {
    filterTable();
  }, [filterTable]);

  useEffect(() => {
    if (dataRow.length) {
      setDataRow(dataRow);
    }
  }, []);

  return (
    <section className={styles.mainTable}>
      <div className="container">
        <div className={styles.mainTableHeader}>
          <div className={styles.buttonWrap}>
            <Button type="primary" onClick={handleShowModal}>
              Фильтр
            </Button>
            <Button type="default" onClick={handleResetFilter} className="pl-1">
              Сбросить фильтр
            </Button>
          </div>
          <ReactSpinnerTimer
            timeInSeconds={5}
            totalLaps={10000}
            isRefresh={false}
            onLapInteraction={handleChangeSpinner}
          />
        </div>
        <AntTable
          rowKey="id"
          columns={columnsDisplay}
          dataSource={rows}
          loading={isLoading}
          onChange={handleChange}
          pagination={{ defaultCurrent: 1, total: data.length, position: ['bottomRight'] }}
        />
      </div>
      {showModal && (
        <ModalTable
          showModal={showModal}
          hideModal={handleShowModal}
          filter={filter}
          callbackFilter={handleTableFilter}
        />
      )}
    </section>
  );
};

export { Table };
