import React, { FC, useEffect, useState } from 'react';
import { Layout } from '../Layout';
import { Table } from '../Table';
import useAsync from '../../hooks/useAsync';
import CocktailService from '../../api';

import './App.scss';

const App: FC = () => {
  const [people, setPeople] = useState([]);
  const { data, isLoading } = useAsync({
    asyncFn: CocktailService.getAllPeople,
  });

  useEffect(() => {
    if (!isLoading) {
      setPeople(data.results);
    }
  }, [isLoading, data]);

  return (
    <Layout>
      <Table isLoading={isLoading} data={people} />
    </Layout>
  );
};

export { App };
