import * as React from 'react';
import LoginForm from '../components/LoginForm';
import PublicLayout from '../components/PublicLayout';
import Context from '../interfaces/Context';
import checkLoggedIn from '../lib/checkLoggedIn';
import redirect from '../lib/redirect';

export type Props = {};

export default class Login extends React.Component<Props, {}> {
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
        <h1>Login form</h1>
        <LoginForm />
      </PublicLayout>
    );
  }
}
