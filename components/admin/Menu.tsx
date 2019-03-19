import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Nav, Navbar, NavItem } from 'reactstrap';
import { Subscribe } from 'unstated';
import SidebarContainer from '../../containers/admin/SidebarContainer';
import User from './menu/User';

export interface MenuProps {}

export interface MenuState {}

function TopbarDivider() {
  return <div className="topbar-divider d-none d-sm-block" />;
}

class Menu extends React.Component<MenuProps, MenuState> {
  public render() {
    return (
      <Subscribe to={[SidebarContainer]}>
        {({ toggle }: SidebarContainer) => (
          <Navbar
            expand
            light
            color="white"
            className="topbar mb-4 static-top shadow"
          >
            <Button
              onClick={toggle}
              color="link"
              id="sidebarToggleTop"
              className="d-md-none rounded-circle mr-3"
            >
              <FontAwesomeIcon icon="bars" />
            </Button>
            <Nav navbar className="ml-auto">
              <NavItem>
                <Link href="/">
                  <a className="btn btn-outline-primary m-3">
                    <FormattedMessage
                      id="go_to_website"
                      defaultMessage="Go to website"
                    />
                  </a>
                </Link>
              </NavItem>
              <TopbarDivider />
              <User />
            </Nav>
          </Navbar>
        )}
      </Subscribe>
    );
  }
}

export default Menu;
