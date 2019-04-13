import * as React from "react";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import PublicLayout from "../components/PublicLayout";

const LoginContainer = styled.div`
  max-width: 300px;
  margin: 30px auto;
`;

export default class Login extends React.Component<{}, {}> {
  public render() {
    return (
      <PublicLayout>
        <LoginContainer>
          <h1>Login form</h1>
          <LoginForm />
        </LoginContainer>
      </PublicLayout>
    );
  }
}
