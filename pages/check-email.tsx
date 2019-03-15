import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Alert } from 'reactstrap';
import Layout from '../containers/Layout';

export type Props = {};
class CheckEmail extends React.Component<Props, {}> {
  render() {
    return (
      <Layout>
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
      </Layout>
    );
  }
}

export default CheckEmail;
