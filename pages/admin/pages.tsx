import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import { FormattedMessage, FormattedRelative, InjectedIntl } from 'react-intl';
import { Card, CardBody, CardFooter, CardHeader, Table } from 'reactstrap';
import Layout from '../../components/admin/Layout';
import PostsPagination from '../../components/admin/Pagination';
import PostsTableHeader from '../../components/admin/PostsTableHeader';
import IconButton from '../../components/IconButton';
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
        <PagesComponent variables={this.state}>
          {({ data }) => {
            if (data && data.pages) {
              return (
                <div className="posts-table">
                  <Card>
                    <CardHeader>
                      <IconButton
                        color="primary"
                        onClick={() => Router.push('/admin/page')}
                        icon="plus"
                      >
                        <FormattedMessage
                          id="new_post"
                          defaultMessage="New post"
                        />
                      </IconButton>
                    </CardHeader>
                    <CardBody>
                      <Table hover>
                        <thead>
                          <PostsTableHeader />
                        </thead>
                        {data && data.pages && data.pages.length > 0 ? (
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
                        ) : (
                          <caption className="text-center">
                            <FormattedMessage
                              id="no_data"
                              defaultMessage="No data"
                            />
                          </caption>
                        )}
                      </Table>
                    </CardBody>
                    <CardFooter>
                      <PostsPagination
                        onChange={skip =>
                          this.setState({ skip: skip * this.state.take })
                        }
                        {...this.state}
                        count={data.pagesCount}
                      />
                    </CardFooter>
                  </Card>
                </div>
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
