import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import { Button, Table } from 'reactstrap';
import Loading from '../../components/Loading';
import Layout from '../../containers/admin/Layout';
import { PostsComponent } from '../../generated/apolloComponents';

export type Props = {};

const HeadRow = () => (
  <tr>
    <th>
      <FormattedMessage id="title" defaultMessage="Title" />
    </th>
    <th>
      <FormattedMessage id="author" defaultMessage="Author" />
    </th>
    <th>
      <FormattedMessage id="created" defaultMessage="Created" />
    </th>
    <th>
      <FormattedMessage id="updated" defaultMessage="Updated" />
    </th>
  </tr>
);

class Posts extends React.Component<Props, {}> {
  render() {
    return (
      <Layout>
        <FormattedMessage tagName="h1" id="posts" defaultMessage="Posts" />
        <Button className="mr-3 mt-3 mb-3" color="primary">
          <FontAwesomeIcon className="mr-2" icon="plus" />
          <FormattedMessage id="new_post" defaultMessage="New post" />
        </Button>
        <PostsComponent>
          {({ data }) => {
            if (data && data.posts) {
              const rows = data.posts.map((post, key) => {
                return (
                  <tr key={key}>
                    <td>
                      <Link
                        href={{
                          pathname: '/admin/edit-post',
                          query: { id: post.id }
                        }}
                        as={'/admin/edit-post/' + post.id}
                      >
                        <a>{post.title}</a>
                      </Link>
                    </td>
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
                <Table hover>
                  <thead>
                    <HeadRow />
                  </thead>
                  <tbody>{rows}</tbody>
                  <tfoot>
                    <HeadRow />
                  </tfoot>
                </Table>
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
