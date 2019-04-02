// utils/withAuth.js - a HOC for protected pages
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';
import { SingletonRouter } from 'next/router';
import { Component } from 'react';
import { meQuery } from '../graphql/user/queries/me';
import Context from '../interfaces/Context';
import redirect from './redirect';

interface Props {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  router: SingletonRouter<Record<string, string | string[] | undefined>>;
}

interface State {
  isLoading: boolean;
}

export default function withAuth(AuthComponent: any) {
  return class Authenticated extends Component<Props, State> {
    static async getInitialProps({ apolloClient, ...ctx }: Context) {
      const result = await apolloClient.query({
        query: meQuery
      });
      if (!(result && result.data && result.data.me)) {
        redirect(ctx, '/login');
      }
      return {};
    }

    public render() {
      return <AuthComponent {...this.props} />;
    }
  };
}
