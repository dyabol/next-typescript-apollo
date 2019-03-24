import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import Layout from '../components/Layout';
import Context from '../interfaces/Context';
import checkLoggedIn from '../lib/checkLoggedIn';
import redirect from '../lib/redirect';
import withIntl from '../lib/withIntl';

export type Props = {
  intl: InjectedIntl;
};

class ForgotPassword extends React.Component<Props, {}> {
  static async getInitialProps(context: Context) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);

    if (!loggedInUser.me) {
      // If not signed in, send them somewhere more useful
      redirect(context, '/login');
    }

    return { loggedInUser };
  }

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
