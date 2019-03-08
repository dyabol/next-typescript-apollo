import React from 'react';
import Layout from '../containers/Layout';
import { HelloComponent } from '../generated/apolloComponents';

export type Props = {};

class Hello extends React.Component<Props, {}> {
  render() {
    return (
      <Layout title="Hello">
        <HelloComponent>
          {({ data }) => (
            <div>{data && data.hello ? data.hello : 'Loading...'}</div>
          )}
        </HelloComponent>
      </Layout>
    );
  }
}

export default Hello;
