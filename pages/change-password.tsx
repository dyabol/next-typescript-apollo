import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import styled from 'styled-components';
import ChangePasswordForm from '../components/ChangePasswordForm';
import PublicLayout from '../components/PublicLayout';
import withIntl from '../lib/withIntl';

export type Props = {
  token: string;
  intl: InjectedIntl;
};

const ChangePassContainer = styled.div`
  max-width: 300px;
  margin: 30px auto;
`;

class ChangePassword extends React.Component<Props, {}> {
  public render() {
    const { intl } = this.props;
    const title = intl.formatMessage({
      id: 'change_password',
      defaultMessage: 'Change password'
    });
    return (
      <PublicLayout title={title}>
        <ChangePassContainer>
          <h1>{title}</h1>
          <ChangePasswordForm {...this.props} />
        </ChangePassContainer>
      </PublicLayout>
    );
  }
}

export default withIntl(ChangePassword);
