import Head from 'next/head';
import * as React from 'react';
import { Container } from 'reactstrap';
import Footer from '../components/Footer';
import Menu from '../components/Menu';

export type Props = {
  readonly title?: string;
};

export default class Layout extends React.Component<Props, {}> {
  /**
   * Main page title
   */
  private pageName: string = 'Page Name';

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
      <>
        <div className="content">
          <Head>
            <title>{this.getTitle()}</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
              key="viewport"
            />
          </Head>
          <Menu />
          <Container className="mt-3">{children}</Container>
        </div>
        <Footer />
      </>
    );
  }
}
