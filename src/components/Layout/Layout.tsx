import React, { ReactNode } from 'react';
import { Layout as AntLayout } from 'antd';
import { Header } from '../Header';
import { Footer } from '../Footer';

const { Content } = AntLayout;

interface IProps {
  children: ReactNode;
}

const Layout = ({ children }: IProps) => (
  <AntLayout>
    <Header />
    <Content>{children}</Content>
    <Footer />
  </AntLayout>
);

export { Layout };
