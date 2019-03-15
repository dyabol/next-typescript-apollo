import React from 'react';
import Layout from '../../containers/admin/Layout';

export type Props = {};

class Index extends React.Component<Props, {}> {
  render() {
    return (
      <Layout>
        <h1>Admin</h1>
        <p>Index</p>
      </Layout>
    );
  }
}

export default Index;
