import * as React from 'react';
import {
  ConfirmUserMutation,
  ConfirmUserVariables
} from '../generated/apolloComponents';
import { confirmUserMutation } from '../graphql/user/mutations/confirmUser';
import Context from '../interfaces/Context';
import redirect from '../lib/redirect';

export type Props = {
  token: string;
};

export default class Confirm extends React.Component<Props, {}> {
  static async getInitialProps({
    query: { token },
    apolloClient,
    ...ctx
  }: Context) {
    if (!token) {
      return {};
    }
    await apolloClient.mutate<ConfirmUserMutation, ConfirmUserVariables>({
      mutation: confirmUserMutation,
      variables: {
        token: token as string
      }
    });

    redirect(ctx, '/login');
  }

  public render() {
    return 'Something went wrong.';
  }
}
