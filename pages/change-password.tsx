import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import ChangePasswordForm from '../components/ChangePasswordForm';
import Layout from '../containers/Layout';
import Context from '../interfaces/Context';
import withIntl from '../lib/withIntl';

export type Props = {
  token: string;
  intl: InjectedIntl;
};

class ChangePassword extends React.Component<Props, {}> {
  static async getInitialProps({ query: { token } }: Context) {
    return { token };
  }

  public render() {
    const { intl } = this.props;
    const title = intl.formatMessage({
      id: 'change_password',
      defaultMessage: 'Change password'
    });
    return (
      <Layout title={title}>
        <h1>{title}</h1>
        <ChangePasswordForm {...this.props} />
      </Layout>
    );
  }
}

export default withIntl(ChangePassword);
