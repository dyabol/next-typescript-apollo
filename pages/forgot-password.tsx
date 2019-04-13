import * as React from "react";
import { InjectedIntl } from "react-intl";
import styled from "styled-components";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import PublicLayout from "../components/PublicLayout";
import withIntl from "../lib/withIntl";

export interface IProps {
  intl: InjectedIntl;
}

const ForgotPassContainer = styled.div`
  max-width: 300px;
  margin: 30px auto;
`;

class ForgotPassword extends React.Component<IProps, {}> {
  public render() {
    const { intl } = this.props;
    const title = intl.formatMessage({
      id: "forgot_password",
      defaultMessage: "Forgot password"
    });
    return (
      <PublicLayout title={title}>
        <ForgotPassContainer>
          <h1>{title}</h1>
          <ForgotPasswordForm />
        </ForgotPassContainer>
      </PublicLayout>
    );
  }
}

export default withIntl(ForgotPassword);
