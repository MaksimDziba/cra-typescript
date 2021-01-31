import React, { useEffect, useState } from 'react';
import { Layout } from '../Layout';
import { Table } from '../Table';
import useAsync from '../../hooks/useAsync';
import CocktailService from '../../api';
import { useDispatch } from 'react-redux';
// import { Dispatch } from 'redux';
import * as actions from '../../store/actions';
// import { ActionsType, IPeopleState } from '../../store/types';
// import { IRootState } from '../../store';

import './App.scss';

const App: React.FC = () => {
  const [people, setPeople] = useState([]);
  const dispatch = useDispatch();

  const { data, isLoading } = useAsync({
    asyncFn: CocktailService.getAllStarwarsPeople,
  });

  useEffect(() => {
    if (!isLoading) {
      setPeople(data);
      dispatch(actions.savePeople(data));
    }
  }, [isLoading, data, dispatch]);

  return (
    <Layout>
      <Table isLoading={isLoading} dataRow={people} />
    </Layout>
  );
};

export default App;
