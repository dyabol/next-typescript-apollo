import * as React from 'react';
import Layout from '../containers/Layout';

export type Props = {
  slug: string;
};

export default class Post extends React.Component<Props, {}> {
  static async getInitialProps({ query }: any) {
    return {
      slug: query.slug
    };
  }

  public render() {
    return (
      <Layout>
        <h1>Test {this.props.slug}</h1>
      </Layout>
    );
  }
}
