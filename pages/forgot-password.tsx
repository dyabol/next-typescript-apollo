import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import Layout from '../containers/Layout';
import withIntl from '../lib/withIntl';

export type Props = {
  intl: InjectedIntl;
};

class ForgotPassword extends React.Component<Props, {}> {
  public render() {
    const { intl } = this.props;
    const title = intl.formatMessage({
      id: 'forgot_password',
      defaultMessage: 'Forgot password'
    });
    return (
      <Layout title={title}>
        <h1>{title}</h1>
        <ForgotPasswordForm />
      </Layout>
    );
  }
}

export default withIntl(ForgotPassword);
