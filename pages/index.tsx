import 'isomorphic-unfetch';
import React from 'react';
import Layout from '../containers/Layout';

export type Props = {};

class Index extends React.Component<Props, {}> {
  render() {
    return (
      <Layout>
        <p>Index</p>
      </Layout>
    );
  }
}

export default Index;
