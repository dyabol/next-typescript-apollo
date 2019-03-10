import Link from 'next/link';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Layout from '../containers/Layout';
import Context from '../interfaces/Context';
import withIntl from '../lib/withIntl';

export type Props = {
  slug: string;
  intl: InjectedIntl;
};

class Post extends React.Component<Props, {}> {
  static async getInitialProps({ query: { slug } }: Context) {
    return {
      slug
    };
  }

  public render() {
    const { intl } = this.props;
    return (
      <Layout>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href="/">
              <a>
                {intl.formatMessage({
                  id: 'home',
                  defaultMessage: 'Home'
                })}
              </a>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link href="/posts">
              <a>
                {intl.formatMessage({
                  id: 'posts',
                  defaultMessage: 'Posts'
                })}
              </a>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Post {this.props.slug}</BreadcrumbItem>
        </Breadcrumb>
        <h1>Post</h1>
        <p>Slug: {this.props.slug}</p>
      </Layout>
    );
  }
}

export default withIntl(Post);
