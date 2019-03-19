import React from 'react';
import { InjectedIntl } from 'react-intl';
import Layout from '../../components/admin/Layout';
import withIntl from '../../lib/withIntl';

export type Props = {
  intl: InjectedIntl;
};

class Index extends React.Component<Props, {}> {
  render() {
    const { intl } = this.props;
    const title = intl.formatMessage({
      id: 'dashboard',
      defaultMessage: 'Dashboard'
    });

    return (
      <Layout title={title}>
        <h1>{title}</h1>
        <p>TODO</p>
      </Layout>
    );
  }
}

export default withIntl(Index);
