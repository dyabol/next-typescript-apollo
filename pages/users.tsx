import React from 'react';
import { InjectedIntl } from 'react-intl';
import Layout from '../components/Layout';
import Context from '../interfaces/Context';
import checkLoggedIn from '../lib/checkLoggedIn';
import redirect from '../lib/redirect';
import withIntl from '../lib/withIntl';

export type Props = {
  intl: InjectedIntl;
};

class Users extends React.Component<Props, {}> {
  static async getInitialProps(context: Context) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);

    if (!loggedInUser.me) {
      // If not signed in, send them somewhere more useful
      redirect(context, '/login');
    }

    return { loggedInUser };
  }

  render() {
    const { intl } = this.props;
    const title = intl.formatMessage({
      id: 'user',
      defaultMessage: 'Users'
    });

    return (
      <Layout title={title}>
        <h1>{title}</h1>
        <p>TODO</p>
      </Layout>
    );
  }
}

export default withIntl(Users);
