import * as React from 'react';
import RegisterForm from '../components/RegisterForm';
import Layout from '../containers/Layout';

export type Props = {};

export default class Post extends React.Component<Props, {}> {
  public render() {
    return (
      <Layout>
        <h1>Register form</h1>
        <RegisterForm />
      </Layout>
    );
  }
}
