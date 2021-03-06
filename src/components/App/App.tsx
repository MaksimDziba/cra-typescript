import React, { useEffect, useState } from 'react';
import { Layout } from '../Layout';
import { Table } from '../Table';
import useAsync from '../../hooks/useAsync';
import StarService from '../../api';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import { People } from '../../interfaces/people';
import { IPagi } from '../../interfaces/pagi';

import './App.scss';

const App: React.FC = () => {
  const [tableState, setTableState] = useState({
    pagi: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
    data: [] as any,
  });

  const dispatch = useDispatch();

  const { data, isLoading } = useAsync({
    asyncFn: StarService.getAllStarwarsPeople,
  });

  const handleRefreshDataTable = async () => {
    const { current, pageSize } = tableState.pagi;

    let countRow = pageSize * current - pageSize;
    let listData = new Array(pageSize)
      .fill({})
      .map((_, idx) => tableState.data[countRow + idx])
      .filter((item) => item !== undefined); // if more than total clear undefined

    const getUpdateRows = await StarService.getTargetPeopleList(listData);
    const copyTableData = tableState.data;

    for (let index = 0; index < pageSize; index++, countRow++) {
      if (pageSize < index) {
        copyTableData[countRow] = getUpdateRows[index];
      }
      break;
    }

    setTableState((prev) => ({ ...prev, data: copyTableData }));
  };

  const handleCallbackTableData = (pagi: IPagi, data: Array<People>): void => {
    setTableState({ pagi, data });
  };

  useEffect(() => {
    if (!isLoading) {
      setTableState((prev) => ({ ...prev, data }));
      dispatch(actions.savePeople(data));
    }
  }, [isLoading, data, dispatch]);

  return (
    <Layout>
      <Table
        isLoading={isLoading}
        dataRow={tableState.data}
        callbackRefreshDataTable={handleRefreshDataTable}
        callbackTableData={handleCallbackTableData}
      />
    </Layout>
  );
};

export default App;
