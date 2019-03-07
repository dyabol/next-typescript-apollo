import React from 'react';
import { Alert } from 'reactstrap';
import Layout from '../containers/Layout';

export type Props = {};

class Index extends React.Component<Props, {}> {
  render() {
    return (
      <Layout>
        <Alert color="success">
          <h4 className="alert-heading">Registred!</h4>
          <p>Check your email to confirm your account.</p>
        </Alert>
      </Layout>
    );
  }
}

export default Index;
