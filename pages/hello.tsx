import React from 'react';
import { FormattedMessage } from 'react-intl';
import Layout from '../containers/Layout';
import { HelloComponent } from '../generated/apolloComponents';

export type Props = {};
export type State = {
  name: string;
  unreadCount: number;
};

class Hello extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: 'Eric',
      unreadCount: 1000
    };
  }

  render() {
    const { name, unreadCount } = this.state;
    return (
      <Layout title="Hello">
        <HelloComponent>
          {({ data }) => (
            <div>{data && data.hello ? data.hello : 'Loading...'}</div>
          )}
        </HelloComponent>
        <FormattedMessage
          id="welcome"
          defaultMessage={`Hello {name}, you have {unreadCount, number} {unreadCount, plural,
                      one {message}
                      other {messages}
                    }`}
          values={{ name: <b>{name}</b>, unreadCount }}
        />
      </Layout>
    );
  }
}

export default Hello;
