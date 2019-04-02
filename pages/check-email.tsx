import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Alert } from 'reactstrap';
import PublicLayout from '../components/PublicLayout';

export type Props = {};
class CheckEmail extends React.Component<Props, {}> {
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
