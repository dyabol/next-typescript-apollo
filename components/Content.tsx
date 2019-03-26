import { Layout } from 'antd';
import * as React from 'react';
import Breadcrumb from './Breadcrumb';

const { Header, Content, Footer } = Layout;

export interface ContentProps {}

export default class MyContent extends React.Component<ContentProps, any> {
  public render() {
    const { children } = this.props;
    return (
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb />
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          PerunCMS ©2018 Created by Jakub Hromek
        </Footer>
      </Layout>
    );
  }
}
