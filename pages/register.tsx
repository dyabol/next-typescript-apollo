import * as React from "react";
import styled from "styled-components";
import PublicLayout from "../components/PublicLayout";
import RegisterForm from "../components/RegisterForm";

const RegisterContainer = styled.div`
  max-width: 600px;
  margin: 30px auto;
`;
export default class Register extends React.Component<{}, {}> {
  public render() {
    return (
      <PublicLayout>
        <RegisterContainer>
          <h1>Register form</h1>
          <RegisterForm />
        </RegisterContainer>
      </PublicLayout>
    );
  }
}
