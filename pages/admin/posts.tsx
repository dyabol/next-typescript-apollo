import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import { Button, Table } from 'reactstrap';
import PostsPagination from '../../components/admin/Pagination';
import PostsTableHeader from '../../components/admin/PostsTableHeader';
import Loading from '../../components/Loading';
import Layout from '../../containers/admin/Layout';
import { PostsComponent } from '../../generated/apolloComponents';

export type Props = {};
export type Stats = {
  skip: number;
  take: number;
};

class Posts extends React.Component<Props, Stats> {
  constructor(props: Props) {
    super(props);
    this.state = {
      skip: 0,
      take: 10
    };
  }

  render() {
    return (
      <Layout>
        <FormattedMessage tagName="h1" id="posts" defaultMessage="Posts" />
        <Button
          className="mr-3 mt-3 mb-3"
          color="primary"
          onClick={() => Router.push('/admin/post')}
        >
          <FontAwesomeIcon className="mr-2" icon="plus" />
          <FormattedMessage id="new_post" defaultMessage="New post" />
        </Button>
        <PostsComponent variables={this.state}>
          {({ data }) => {
            if (data && data.posts) {
              const rows = data.posts.map((post, key) => {
                return (
                  <tr key={key}>
                    <td>
                      <Link
                        href={{
                          pathname: '/admin/post',
                          query: { id: post.id }
                        }}
                        as={'/admin/post/' + post.id}
                      >
                        <a>{post.title}</a>
                      </Link>
                    </td>
                    <td>{post.slug}</td>
                    <td>{post.user.fullName}</td>
                    <td>
                      <FormattedRelative value={post.createdAt} />{' '}
                    </td>
                    <td>
                      <FormattedRelative value={post.updatedAt} />{' '}
                    </td>
                  </tr>
                );
              });
              return (
                <>
                  <div className="posts-table">
                    <Table hover>
                      <thead>
                        <PostsTableHeader />
                      </thead>
                      <tbody>{rows}</tbody>
                      <tfoot>
                        <PostsTableHeader />
                      </tfoot>
                    </Table>
                  </div>
                  <PostsPagination
                    onChange={skip =>
                      this.setState({ skip: skip * this.state.take })
                    }
                    {...this.state}
                    count={data.postsCount}
                  />
                </>
              );
            }
            return <Loading />;
          }}
        </PostsComponent>
      </Layout>
    );
  }
}

export default Posts;
