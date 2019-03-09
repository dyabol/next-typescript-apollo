import * as React from 'react';
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem
} from 'reactstrap';
import Link from './Link';

export interface MenuProps {}

export interface MenuState {
  isOpen: boolean;
}

export default class Menu extends React.Component<MenuProps, MenuState> {
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
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link prefetch href="/">
                Home
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/post/something">Post</Link>
            </NavItem>
            <NavItem>
              <Link href="/register">Register</Link>
            </NavItem>
            <NavItem>
              <Link href="/login">Login</Link>
            </NavItem>
            <NavItem>
              <Link href="/forgot-password">Forgot password</Link>
            </NavItem>
            <NavItem>
              <Link href="/hello">Hello</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
