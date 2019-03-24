import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import ChangePasswordForm from '../components/ChangePasswordForm';
import PublicLayout from '../components/PublicLayout';
import Context from '../interfaces/Context';
import checkLoggedIn from '../lib/checkLoggedIn';
import redirect from '../lib/redirect';
import withIntl from '../lib/withIntl';

export type Props = {
  token: string;
  intl: InjectedIntl;
};

class ChangePassword extends React.Component<Props, {}> {
  static async getInitialProps(context: Context) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);

    if (loggedInUser.me) {
      // If not signed in, send them somewhere more useful
      redirect(context, '/');
    }

    const {
      query: { token }
    } = context;
    return { token };
  }

  public render() {
    const { intl } = this.props;
    const title = intl.formatMessage({
      id: 'change_password',
      defaultMessage: 'Change password'
    });
    return (
      <PublicLayout title={title}>
        <h1>{title}</h1>
        <ChangePasswordForm {...this.props} />
      </PublicLayout>
    );
  }
}

export default withIntl(ChangePassword);
