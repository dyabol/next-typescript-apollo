import 'isomorphic-unfetch';
import Link from 'next/link';
import React from 'react';
import Layout from '../containers/Layout';
import { LoginComponent } from '../generated/apolloComponents';

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
        <LoginComponent>
          {mutation => (
            <button
              onClick={async () => {
                const result = await mutation({
                  variables: {
                    email: 'dyabol@gmail.com',
                    password: 'heslo'
                  }
                });
                console.log(result);
              }}
            >
              Call login mutation
            </button>
          )}
        </LoginComponent>
      </Layout>
    );
  }
}

export default Index;
