import 'isomorphic-unfetch';
import React from 'react';
import LoginForm from '../components/LoginForm';
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
        <LoginForm />
      </Layout>
    );
  }
}

export default Index;
