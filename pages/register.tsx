import * as React from 'react';
import Layout from '../components/Layout';
import RegisterForm from '../components/RegisterForm';

export type Props = {};

export default class Register extends React.Component<Props, {}> {
  public render() {
    return (
      <Layout>
        <h1>Register form</h1>
        <RegisterForm />
      </Layout>
    );
  }
}
