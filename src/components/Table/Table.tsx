import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Table as AntTable, Button } from 'antd';
import { People } from '../../interfaces/people';
import { ITableFilter } from '../../interfaces/filter';
import { ModalTable } from '../Modals/ModalTable';
import { useTable, useSortBy } from 'react-table';

import styles from './Table.module.scss';

interface ITableProps {
  isLoading: boolean;
  dataRow: People[];
}

const Table = ({ isLoading, dataRow }: ITableProps) => {
  const initData = dataRow;
  const initFilter = {
    input: '',
    checkbox: false,
    select: '',
    sortedInfo: { columnKey: '', order: 'descend' },
  }
  const [showModal, setShowModal] = useState<boolean>(false);
  const [data, setDataRow] = useState<People[]>([]);
  const [filter, setFilter] = useState<ITableFilter>(initFilter);

  const handleResetFilter = (): void => setFilter(initFilter);
  const handleShowModal = (): void => setShowModal((prev) => !prev);
  const handleChange = (pagination: any, filters: any, sorter: any): void => {
    setFilter({ ...filter, sortedInfo: sorter });
  };
  const handleTableFilter = (modalFilter: ITableFilter): void => {
    setFilter({
      ...modalFilter,
      sortedInfo: { columnKey: modalFilter.select, order: 'des' },
    });
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
          if(a.values.eye_color < b.values.eye_color) { return -1; }
          if(a.values.eye_color > b.values.eye_color) { return 1; }
          return 0
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
          if(a.values.birth_year < b.values.birth_year) { return -1; }
          if(a.values.birth_year > b.values.birth_year) { return 1; }
          return 0
        },
        sortOrder: filter.sortedInfo.columnKey === 'birth_year',
      },
    ],
    [filter],
  );
  useEffect(() => {
    if (dataRow.length) {
      setDataRow(dataRow);
    }
  }, []);

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

  return (
    <section className={styles.mainTable}>
      <div className="container">
        <div className={styles.mainTable}>
          <Button type="primary" onClick={handleShowModal}>
            Open Modal
          </Button>
          <Button type="default" onClick={handleResetFilter} className="pl-1">
            reset filter
          </Button>
        </div>
        <AntTable
          rowKey="id"
          columns={columnsDisplay}
          dataSource={rows}
          loading={isLoading}
          onChange={handleChange}
          pagination={{ defaultCurrent: 1, total: data.length }}
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
