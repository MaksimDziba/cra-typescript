import React from 'react';
import { Layout } from 'antd';

import './Header.scss';


const { Header: AntHeader } = Layout;

const Header = () => {
  return <AntHeader>
    <div className="container">
      <h1>React Table</h1>
    </div>
  </AntHeader>
}

export { Header };