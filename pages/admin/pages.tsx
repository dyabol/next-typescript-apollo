import React from 'react';
import { InjectedIntl } from 'react-intl';
import Layout from '../../containers/admin/Layout';
import withIntl from '../../lib/withIntl';

export type Props = {
  intl: InjectedIntl;
};

class Pages extends React.Component<Props, {}> {
  render() {
    const { intl } = this.props;
    const title = intl.formatMessage({
      id: 'pages',
      defaultMessage: 'Pages'
    });

    return (
      <Layout title={title}>
        <h1>{title}</h1>
        <p>TODO</p>
      </Layout>
    );
  }
}

export default withIntl(Pages);
