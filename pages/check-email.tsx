import { Alert } from "antd";
import React from "react";
import { InjectedIntl } from "react-intl";
import PublicLayout from "../components/PublicLayout";
import withIntl from "../lib/withIntl";

export interface IProps {
  intl: InjectedIntl;
}
class CheckEmail extends React.Component<IProps, {}> {
  public render() {
    const { intl } = this.props;
    return (
      <PublicLayout>
        <Alert
          message={intl.formatMessage({
            id: "registred",
            defaultMessage: "Registred"
          })}
          description={intl.formatMessage({
            id: "check_email_massage",
            defaultMessage: "Check your email to confirm your account."
          })}
          type="success"
        />
      </PublicLayout>
    );
  }
}

export default withIntl(CheckEmail);
