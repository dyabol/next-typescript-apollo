import React from 'react';
import Layout from '../components/Layout';

export type Props = {};

class Index extends React.Component<Props, {}> {
  render() {
    return (
      <Layout>
        <h1>Hlavní stránka</h1>
        <p>Index</p>
      </Layout>
    );
  }
}

export default Index;
