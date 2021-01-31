import React from 'react';
import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
  return (
    <AntFooter>
      <div className="container">Footer</div>
    </AntFooter>
  );
};

export { Footer };
