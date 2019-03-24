import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Alert } from 'reactstrap';
import PublicLayout from '../components/PublicLayout';
import Context from '../interfaces/Context';
import checkLoggedIn from '../lib/checkLoggedIn';
import redirect from '../lib/redirect';

export type Props = {};
class CheckEmail extends React.Component<Props, {}> {
  static async getInitialProps(context: Context) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);

    if (loggedInUser.me) {
      // If not signed in, send them somewhere more useful
      redirect(context, '/');
    }

    return { loggedInUser };
  }

  render() {
    return (
      <PublicLayout>
        <Alert color="success">
          <FormattedMessage
            tagName="h4"
            id="registred"
            defaultMessage="Registred"
          />
          <FormattedMessage
            tagName="p"
            id="check_email_massage"
            defaultMessage="Check your email to confirm your account."
          />
        </Alert>
      </PublicLayout>
    );
  }
}

export default CheckEmail;
