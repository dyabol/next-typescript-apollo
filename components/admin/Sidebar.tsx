import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { Nav, NavItem } from 'reactstrap';
import styled from 'styled-components';
import withIntl from '../../lib/withIntl';
import MenuLink from '../MenuLink';

export interface SidebarProps {
  intl: InjectedIntl;
}

const Container = styled.div`
  min-width: 200px;
`;

class Sidebar extends React.Component<SidebarProps, any> {
  public render() {
    const { intl } = this.props;
    return (
      <Container>
        <Nav vertical>
          <NavItem>
            <MenuLink href="/admin">
              {intl.formatMessage({
                id: 'main',
                defaultMessage: 'Main'
              })}
            </MenuLink>
          </NavItem>
          <NavItem>
            <MenuLink href="/admin/posts">
              {intl.formatMessage({
                id: 'posts',
                defaultMessage: 'Posts'
              })}
            </MenuLink>
          </NavItem>
        </Nav>
      </Container>
    );
  }
}

export default withIntl(Sidebar);
