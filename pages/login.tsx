import * as React from 'react';
import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm';

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
