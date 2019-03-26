import { Breadcrumb, Icon } from 'antd';
import Link from 'next/link';
import { withRouter } from 'next/router';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export interface BreadcrumbProps {}

const breadcrumbNameMap: { [key: string]: string } = {
  '/posts': 'posts',
  '/pages': 'pages',
  '/menus': 'menus',
  '/_error': 'Error',
  '/posts/post': 'post',
  '/pages/page': 'page'
};

export default withRouter(props => {
  const { router } = props;
  if (router) {
    const pathSnippets = router.pathname.split('/').filter(i => i);
    const len = pathSnippets.length;
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      if (len === index + 1) {
        return (
          <Breadcrumb.Item key={url}>
            {breadcrumbNameMap[url] ? (
              <FormattedMessage id={breadcrumbNameMap[url]} />
            ) : (
              url
            )}
          </Breadcrumb.Item>
        );
      }
      return (
        <Breadcrumb.Item key={url}>
          <Link href={url}>
            <a>
              {breadcrumbNameMap[url] ? (
                <FormattedMessage id={breadcrumbNameMap[url]} />
              ) : (
                url
              )}
            </a>
          </Link>
        </Breadcrumb.Item>
      );
    });
    const breadcrumbItems = [
      <Breadcrumb.Item key="home">
        <Link href="/">
          <a>
            <Icon type="home" />
          </a>
        </Link>
      </Breadcrumb.Item>
    ].concat(extraBreadcrumbItems);
    return (
      <Breadcrumb style={{ margin: '16px 0' }}>{breadcrumbItems}</Breadcrumb>
    );
  }
  return null;
});
