import React from 'react';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import { HelloComponent } from '../generated/apolloComponents';

export type Props = {};

class Hello extends React.Component<Props, {}> {
  render() {
    return (
      <Layout title="Hello">
        <HelloComponent>
          {({ data }) => (
            <div>{data && data.hello ? data.hello : <Loading />}</div>
          )}
        </HelloComponent>
      </Layout>
    );
  }
}

export default Hello;
