import React from "react";
import { InjectedIntl } from "react-intl";
import Layout from "../components/Layout";
import withAuth from "../lib/withAuth";
import withIntl from "../lib/withIntl";

export interface IProps {
  intl: InjectedIntl;
}

class Users extends React.Component<IProps, {}> {
  public render() {
    const { intl } = this.props;
    const title = intl.formatMessage({
      id: "user",
      defaultMessage: "Users"
    });

    return (
      <Layout title={title}>
        <h1>{title}</h1>
        <p>TODO</p>
      </Layout>
    );
  }
}

export default withIntl(withAuth(Users));
