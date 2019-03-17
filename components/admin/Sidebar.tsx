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
            <MenuLink href="/admin" icon="home">
              {intl.formatMessage({
                id: 'main',
                defaultMessage: 'Main'
              })}
            </MenuLink>
          </NavItem>
          <NavItem>
            <MenuLink href="/admin/posts" icon="pencil-alt">
              {intl.formatMessage({
                id: 'posts',
                defaultMessage: 'Posts'
              })}
            </MenuLink>
          </NavItem>
          <NavItem>
            <MenuLink href="/admin/pages" icon="file-alt">
              {intl.formatMessage({
                id: 'pages',
                defaultMessage: 'Pages'
              })}
            </MenuLink>
          </NavItem>
          <NavItem>
            <MenuLink href="/admin/menus" icon="compass">
              {intl.formatMessage({
                id: 'menus',
                defaultMessage: 'Menus'
              })}
            </MenuLink>
          </NavItem>
          <NavItem>
            <MenuLink href="/admin/profile" icon="user-tie">
              {intl.formatMessage({
                id: 'profile',
                defaultMessage: 'Profile'
              })}
            </MenuLink>
          </NavItem>
          <NavItem>
            <MenuLink href="/admin/users" icon="users">
              {intl.formatMessage({
                id: 'users',
                defaultMessage: 'Users'
              })}
            </MenuLink>
          </NavItem>
        </Nav>
      </Container>
    );
  }
}

export default withIntl(Sidebar);
