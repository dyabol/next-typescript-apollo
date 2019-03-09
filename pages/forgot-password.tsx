import * as React from 'react';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import Layout from '../containers/Layout';

export type Props = {};

export default class Register extends React.Component<Props, {}> {
  public render() {
    return (
      <Layout title="Forgot password">
        <h1>Forgot password</h1>
        <ForgotPasswordForm />
      </Layout>
    );
  }
}
