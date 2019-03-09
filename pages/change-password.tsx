import * as React from 'react';
import ChangePasswordForm from '../components/ChangePasswordForm';
import Layout from '../containers/Layout';
import Context from '../interfaces/Context';

export type Props = {
  token: string;
};

export default class Register extends React.Component<Props, {}> {
  static async getInitialProps({ query: { token } }: Context) {
    return { token };
  }

  public render() {
    return (
      <Layout title="Change password">
        <h1>Change password</h1>
        <ChangePasswordForm {...this.props} />
      </Layout>
    );
  }
}
