import React from 'react';
import Link from 'next/link';
import 'isomorphic-unfetch';
import Layout from '../containers/Layout';

export type Props = {
  stars: string;
};

export default class Preact extends React.Component<Props, {}> {
  static async getInitialProps() {
    // eslint-disable-next-line no-undef
    const res = await fetch('https://api.github.com/repos/developit/preact');
    const json = await res.json();
    return { stars: json.stargazers_count };
  }

  render() {
    return (
      <Layout title="Preact">
        <p>Preact has {this.props.stars} ⭐️</p>
        <Link prefetch href="/">
          <a>I bet next has more stars (?)</a>
        </Link>
      </Layout>
    );
  }
}
