import * as React from 'react';
import { Container } from 'reactstrap';
import Menu from './Menu';

export interface ContentProps {}

export default class Content extends React.Component<ContentProps, any> {
  public render() {
    const { children } = this.props;
    return (
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Menu />
          <Container fluid>{children}</Container>
        </div>
      </div>
    );
  }
}
