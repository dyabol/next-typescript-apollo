import * as React from 'react';
import PublicLayout from '../components/PublicLayout';
import RegisterForm from '../components/RegisterForm';
import Context from '../interfaces/Context';
import checkLoggedIn from '../lib/checkLoggedIn';
import redirect from '../lib/redirect';

export type Props = {};

export default class Register extends React.Component<Props, {}> {
  static async getInitialProps(context: Context) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);

    if (loggedInUser.me) {
      // If not signed in, send them somewhere more useful
      redirect(context, '/');
    }

    return { loggedInUser };
  }

  public render() {
    return (
      <PublicLayout>
        <h1>Register form</h1>
        <RegisterForm />
      </PublicLayout>
    );
  }
}
