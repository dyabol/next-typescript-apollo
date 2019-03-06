import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';

export type Props = {
  readonly title?: string;
};

export default class Layout extends React.Component<Props, {}> {
  /**
   * Main page title
   */
  private pageName: string = 'Page Name';

  /**
   * Return page title
   */
  private getTitle(): string {
    if (this.props.title) {
      return this.props.title + ' | ' + this.pageName;
    }
    return this.pageName;
  }

  public render() {
    const { children } = this.props;
    return (
      <div>
        <Head>
          <title>{this.getTitle()}</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
            key="viewport"
          />
        </Head>
        <nav>
          <Link prefetch href="/">
            <a>Home</a>
          </Link>
          <Link href="/preact" as="/preact">
            <a>Preact</a>
          </Link>
          <Link href="/post?slug=something" as="/post/something">
            <a>Post</a>
          </Link>
          <Link href="/register" as="/register">
            <a>Register</a>
          </Link>
        </nav>
        {children}
        <footer>Jakub Hromek &copy; 2019</footer>
      </div>
    );
  }
}
