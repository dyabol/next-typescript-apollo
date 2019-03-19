import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import { FormattedMessage, FormattedRelative, InjectedIntl } from 'react-intl';
import { Button, Table } from 'reactstrap';
import Layout from '../../components/admin/Layout';
import PostsPagination from '../../components/admin/Pagination';
import PostsTableHeader from '../../components/admin/PostsTableHeader';
import { PagesComponent } from '../../generated/apolloComponents';
import withIntl from '../../lib/withIntl';

export type Props = {
  intl: InjectedIntl;
};
export type Stats = {
  skip: number;
  take: number;
};

class Pages extends React.Component<Props, Stats> {
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
      id: 'pages',
      defaultMessage: 'Pages'
    });

    return (
      <Layout title={title}>
        <h1>{title}</h1>
        <Button
          className="mr-3 mt-3 mb-3"
          color="primary"
          onClick={() => Router.push('/admin/page')}
        >
          <FontAwesomeIcon className="mr-2" icon="plus" />
          <FormattedMessage id="new_page" defaultMessage="New page" />
        </Button>
        <PagesComponent variables={this.state}>
          {({ data }) => {
            if (data && data.pages) {
              return (
                <>
                  <div className="posts-table">
                    <Table hover>
                      <thead>
                        <PostsTableHeader />
                      </thead>
                      <tbody>
                        {data.pages.map((post, key) => {
                          return (
                            <tr key={key}>
                              <td>
                                <Link
                                  href={{
                                    pathname: '/admin/page',
                                    query: { id: post.id }
                                  }}
                                  as={'/admin/page/' + post.id}
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
                        })}
                      </tbody>
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
                    count={data.pagesCount}
                  />
                </>
              );
            }
            return null;
          }}
        </PagesComponent>
      </Layout>
    );
  }
}

export default withIntl(Pages);
