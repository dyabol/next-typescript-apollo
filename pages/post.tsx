import * as React from 'react';

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
    return <h1>Test {this.props.slug}</h1>;
  }
}
