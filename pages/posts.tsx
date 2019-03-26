import { Button } from 'antd';
import Router from 'next/router';
import React from 'react';
import { FormattedMessage, InjectedIntl } from 'react-intl';
import Layout from '../components/Layout';
import PostsTable from '../components/PostsTable';
import Context from '../interfaces/Context';
import checkLoggedIn from '../lib/checkLoggedIn';
import redirect from '../lib/redirect';
import withIntl from '../lib/withIntl';

export type Props = {
  intl: InjectedIntl;
};
export type Stats = {};

class Posts extends React.Component<Props, Stats> {
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
      id: 'posts',
      defaultMessage: 'Posts'
    });

    return (
      <Layout title={title}>
        <div style={{ marginBottom: '16px' }}>
          <Button
            onClick={() => Router.push('/posts/post')}
            type="primary"
            icon="plus"
            size="large"
          >
            <FormattedMessage id="new_post" defaultMessage="New post" />
          </Button>
        </div>
        <PostsTable />
      </Layout>
    );
  }
}

export default withIntl(Posts);
