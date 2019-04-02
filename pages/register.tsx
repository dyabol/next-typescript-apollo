import * as React from 'react';
import PublicLayout from '../components/PublicLayout';
import RegisterForm from '../components/RegisterForm';

export type Props = {};

export default class Register extends React.Component<Props, {}> {
  public render() {
    return (
      <PublicLayout>
        <h1>Register form</h1>
        <RegisterForm />
      </PublicLayout>
    );
  }
}
