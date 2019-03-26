import { Button } from 'antd';
import Router from 'next/router';
import React from 'react';
import { FormattedMessage, InjectedIntl } from 'react-intl';
import Layout from '../components/Layout';
import PostsTable from '../components/PostsTable';
import { PostsComponent } from '../generated/apolloComponents';
import Context from '../interfaces/Context';
import checkLoggedIn from '../lib/checkLoggedIn';
import redirect from '../lib/redirect';
import withIntl from '../lib/withIntl';

export type Props = {
  intl: InjectedIntl;
};
export type Stats = {
  skip: number;
  take: number;
};

class Posts extends React.Component<Props, Stats> {
  static async getInitialProps(context: Context) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);

    if (!loggedInUser.me) {
      // If not signed in, send them somewhere more useful
      redirect(context, '/login');
    }

    return { loggedInUser };
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      skip: 0,
      take: 10
    };
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
        <PostsComponent
          variables={{
            skip: this.state.skip,
            take: this.state.take
          }}
        >
          {({ loading, error, data }) => {
            if (error) {
              throw error;
            }
            return (
              <PostsTable
                onPagination={(page: number) =>
                  this.setState({
                    skip: this.state.take * (page - 1)
                  })
                }
                url="/posts/post"
                total={data && data.postsCount}
                data={data && data.posts}
                loading={loading}
              />
            );
          }}
        </PostsComponent>
      </Layout>
    );
  }
}

export default withIntl(Posts);
