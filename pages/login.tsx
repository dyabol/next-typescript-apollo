import * as React from 'react';
import LoginForm from '../components/LoginForm';
import PublicLayout from '../components/PublicLayout';

export type Props = {};

export default class Login extends React.Component<Props, {}> {
  public render() {
    return (
      <PublicLayout>
        <h1>Login form</h1>
        <LoginForm />
      </PublicLayout>
    );
  }
}
