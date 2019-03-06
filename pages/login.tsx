import * as React from 'react';
import LoginForm from '../components/LoginForm';
import Layout from '../containers/Layout';

export type Props = {};

export default class Login extends React.Component<Props, {}> {
  public render() {
    return (
      <Layout>
        <h1>Login form</h1>
        <LoginForm />
      </Layout>
    );
  }
}
