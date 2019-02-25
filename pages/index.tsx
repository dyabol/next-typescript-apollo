import React from 'react';
import Link from 'next/link';
import 'isomorphic-unfetch';
import Layout from '../containers/Layout';

export type Props = {
  stars: string;
};

class Index extends React.Component<Props, {}> {
  static async getInitialProps() {
    // eslint-disable-next-line no-undef
    const res = await fetch('https://api.github.com/repos/zeit/next.js');
    const json = await res.json();
    return { stars: json.stargazers_count };
  }

  render() {
    return (
      <Layout>
        <p>Next.js has {this.props.stars} ⭐️</p>
        <Link prefetch href="/preact">
          <a>How about preact?</a>
        </Link>
        <Link href="/post?slug=something" as="/post/something">
          <a>Post</a>
        </Link>
      </Layout>
    );
  }
}

export default Index;
