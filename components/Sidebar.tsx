import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Brand from './sidebar/Brand';
import Container from './sidebar/Container';
import Divider from './sidebar/Divider';
import Heading from './sidebar/Heading';
import NavItem from './sidebar/NavItem';

export interface SidebarProps {}

export interface SidebarState {}
class Sidebar extends React.Component<SidebarProps, SidebarState> {
  public render() {
    return (
      <Container>
        <Brand />
        <Divider className="my-0" />
        <NavItem icon="home" href="/">
          <FormattedMessage id="dashboard" defaultMessage="Dashboard" />
        </NavItem>
        <Divider />
        <Heading>
          <FormattedMessage id="content" defaultMessage="Content" />
        </Heading>
        <NavItem icon="pencil-alt" href="/posts">
          <FormattedMessage id="posts" defaultMessage="Posts" />
        </NavItem>
        <NavItem icon="file-alt" href="/pages">
          <FormattedMessage id="pages" defaultMessage="Pages" />
        </NavItem>
        <NavItem icon="compass" href="/menus">
          <FormattedMessage id="menus" defaultMessage="Menus" />
        </NavItem>
        <NavItem icon="images" href="/media">
          <FormattedMessage id="media" defaultMessage="Media" />
        </NavItem>
        <Divider />
        <Heading>
          <FormattedMessage id="personal" defaultMessage="Personal" />
        </Heading>
        <NavItem icon="user-tie" href="/profile">
          <FormattedMessage id="profile" defaultMessage="Profile" />
        </NavItem>
        <NavItem icon="users" href="/users">
          <FormattedMessage id="users" defaultMessage="Users" />
        </NavItem>
        <Divider />
        <Heading>
          <FormattedMessage id="settings" defaultMessage="Settings" />
        </Heading>
        <NavItem icon="cog" href="/settings">
          <FormattedMessage id="main" defaultMessage="Main" />
        </NavItem>
      </Container>
    );
  }
}

export default Sidebar;
