import * as React from "react";
import { FormattedMessage } from "react-intl";
import {
  ConfirmUserMutation,
  ConfirmUserVariables
} from "../generated/apolloComponents";
import { confirmUserMutation } from "../graphql/user/mutations/confirmUser";
import IContext from "../interfaces/Context";
import redirect from "../lib/redirect";

export interface IProps {
  token: string;
}

export default class Confirm extends React.Component<IProps, {}> {
  public static async getInitialProps(context: IContext) {
    const {
      query: { token },
      apolloClient,
      ...ctx
    } = context;

    if (!token) {
      return {};
    }
    await apolloClient.mutate<ConfirmUserMutation, ConfirmUserVariables>({
      mutation: confirmUserMutation,
      variables: {
        token: token as string
      }
    });

    redirect(ctx, "/login");
  }

  public render() {
    return (
      <FormattedMessage
        id="something_went_wrong"
        defaultMessage="Something went wrong."
      />
    );
  }
}
