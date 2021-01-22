import React from 'react';
import { Table as AntTable } from 'antd';
// import { ColumnsType } from 'antd/es/table';
import { People } from '../../interfaces/people';
import { useTable, usePagination } from 'react-table';

import styles from './Table.module.css';

interface IPeopleTable {
  isLoading: boolean;
  data: People[];
}

const Table = ({ isLoading, data }: IPeopleTable) => {
  const columns: any = React.useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        accessor: 'name',
      },
      {
        title: 'Height',
        dataIndex: 'height',
        key: 'height',
        accessor: 'height',
      },
      {
        title: 'Eye color',
        dataIndex: 'eye_color',
        key: 'eye_color',
        accessor: 'eye_color',
      },
      {
        title: 'Birth year',
        dataIndex: 'birth_year',
        key: 'birth_year',
        accessor: 'birth_year',
      },
    ],
    [],
  );

  // const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
  //   console.log('params', pagination, filters, sorter, extra);
  // };

  const { rows } = useTable({ columns, data }, usePagination);

  const dataRows = rows.map((row) => ({ ...row.values, key: row.id }));
  
  return (
    <section className={styles.mainTable}>
      <div className="container">
        <AntTable
          columns={columns}
          dataSource={dataRows}
          loading={isLoading}
          pagination={{ defaultCurrent: 1, total: dataRows.length }}
        />
      </div>
    </section>
  );
};

export { Table };
