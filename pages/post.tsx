import Link from 'next/link';
import * as React from 'react';
import { FormattedMessage, InjectedIntl } from 'react-intl';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Layout from '../containers/Layout';
import { PostBySlugProps } from '../generated/apolloComponents';
import { postBySlugQuery } from '../graphql/post/queries/postBySlug';
import Context from '../interfaces/Context';
import withIntl from '../lib/withIntl';

export type Props =
  | {
      intl: InjectedIntl;
    }
  | PostBySlugProps;

class Post extends React.Component<Props, {}> {
  static async getInitialProps({ apolloClient, query: { slug } }: Context) {
    const post = await apolloClient.query({
      query: postBySlugQuery,
      variables: { slug }
    });
    if (!post || post.loading || !post.data) {
      return {};
    }
    return {
      ...post.data.post
    };
  }

  public render() {
    const { id, user, title, content, intl } = this.props;
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
          <BreadcrumbItem active>{title}</BreadcrumbItem>
        </Breadcrumb>
        <section>
          <article id={'post-' + id} className="post">
            <header>
              <h1 className="post-title">{title}</h1>
            </header>
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <footer>
              <FormattedMessage
                id="post_author"
                defaultMessage={'Author: {fullName}'}
                values={{ fullName: user.fullName }}
              />
            </footer>
          </article>
        </section>
      </Layout>
    );
  }
}

export default withIntl(Post);
