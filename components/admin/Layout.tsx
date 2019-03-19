import Head from 'next/head';
import * as React from 'react';
import { Provider } from 'unstated';
import { MeComponent } from '../../generated/apolloComponents';
import Loading from '../Loading';
import Content from './Content';
import Sidebar from './Sidebar';

export type Props = {
  readonly title?: string;
};

export default class Layout extends React.Component<Props, {}> {
  /**
   * Main page title
   */
  private pageName: string = 'Admin';

  /**
   * Return page title
   */
  private getTitle(): string {
    if (this.props.title) {
      return this.props.title + ' | ' + this.pageName;
    }
    return this.pageName;
  }

  public render() {
    const { children } = this.props;
    return (
      <MeComponent>
        {({ data }) =>
          data && data.me ? (
            <div id="wrapper" className="admin">
              <Head>
                <title>{this.getTitle()}</title>
                <meta
                  name="viewport"
                  content="initial-scale=1.0, width=device-width"
                  key="viewport"
                />
                <link
                  href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
                  rel="stylesheet"
                />
              </Head>
              <Provider>
                <Sidebar />
                <Content>{children}</Content>
              </Provider>
            </div>
          ) : (
            <Loading />
          )
        }
      </MeComponent>
    );
  }
}
