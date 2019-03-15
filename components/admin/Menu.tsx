import Link from 'next/link';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { Collapse, Nav, Navbar, NavbarToggler, NavItem } from 'reactstrap';
import withIntl from '../../lib/withIntl';
import MenuLink from '../MenuLink';

export interface MenuProps {
  intl: InjectedIntl;
}

export interface MenuState {
  isOpen: boolean;
}

class Menu extends React.Component<MenuProps, MenuState> {
  constructor(props: MenuProps) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  public render() {
    const { intl } = this.props;
    return (
      <Navbar color="dark" dark expand="md">
        <Link href="/admin">
          <a className="navbar-brand">
            {intl.formatMessage({
              id: 'administration',
              defaultMessage: 'Administration'
            })}
          </a>
        </Link>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <MenuLink className="btn btn-primary ml-3" href="/">
                {intl.formatMessage({
                  id: 'go_to_website',
                  defaultMessage: 'Go to website'
                })}
              </MenuLink>
            </NavItem>
            <NavItem>
              <MenuLink className="btn btn-secondary ml-3" href="/logout">
                {intl.formatMessage({
                  id: 'logout',
                  defaultMessage: 'Logout'
                })}
              </MenuLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default withIntl(Menu);
