import * as React from 'react';
import Layout from '../containers/Layout';
import Context from '../interfaces/Context';

export type Props = {
  slug: string;
};

export default class Post extends React.Component<Props, {}> {
  static async getInitialProps({ query: { slug } }: Context) {
    return {
      slug
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
