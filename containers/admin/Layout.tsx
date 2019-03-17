import Head from 'next/head';
import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Menu from '../../components/admin/Menu';
import Sidebar from '../../components/admin/Sidebar';
import Loading from '../../components/Loading';
import { MeComponent } from '../../generated/apolloComponents';

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
            <>
              <div className="content d-flex flex-column admin">
                <Head>
                  <title>{this.getTitle()}</title>
                  <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                    key="viewport"
                  />
                </Head>
                <Menu />
                <Container className="flex-grow-1 d-flex" fluid={true}>
                  <Row className="flex-grow-1">
                    <Col className="p-0 admin-side-bar" xs={'auto'}>
                      <Sidebar />
                    </Col>
                    <Col className="pt-3">{children}</Col>
                  </Row>
                </Container>
              </div>
            </>
          ) : (
            <Loading />
          )
        }
      </MeComponent>
    );
  }
}
