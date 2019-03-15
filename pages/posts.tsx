import Link from 'next/link';
import * as React from 'react';
import { FormattedMessage, InjectedIntl } from 'react-intl';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Loading from '../components/Loading';
import Layout from '../containers/Layout';
import { PostsComponent } from '../generated/apolloComponents';
import withIntl from '../lib/withIntl';

export type Props = {
  intl: InjectedIntl;
};

class Posts extends React.Component<Props, {}> {
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
          <BreadcrumbItem active>
            {intl.formatMessage({
              id: 'posts',
              defaultMessage: 'Posts'
            })}
          </BreadcrumbItem>
        </Breadcrumb>
        <PostsComponent>
          {({ data }) => {
            if (data && data.posts) {
              const posts = data.posts.map((post, key) => {
                return (
                  <article id={'post-' + post.id} className="post" key={key}>
                    <header>
                      <h2 className="post-title">{post.title}</h2>
                    </header>
                    <div
                      className="post-content"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                    <Link
                      href={{ pathname: '/post', query: { slug: post.slug } }}
                      as={'/post/' + post.slug}
                    >
                      <a>
                        {intl.formatMessage({
                          id: 'detail',
                          defaultMessage: 'Detail'
                        })}
                      </a>
                    </Link>
                    <footer>
                      <FormattedMessage
                        id="post_author"
                        defaultMessage={'Author: {fullName}'}
                        values={{ fullName: post.user.fullName }}
                      />
                    </footer>
                  </article>
                );
              });
              return <section>{posts}</section>;
            }
            return <Loading />;
          }}
        </PostsComponent>
      </Layout>
    );
  }
}

export default withIntl(Posts);
