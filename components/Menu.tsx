import * as React from 'react';
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem
} from 'reactstrap';
import { MeComponent } from '../generated/apolloComponents';
import MenuLink from './MenuLink';

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
              <MenuLink prefetch={true} href="/">
                Home
              </MenuLink>
            </NavItem>
            <NavItem>
              <MenuLink
                href={{ pathname: '/post', query: { slug: 'something' } }}
                as="/post/something"
              >
                Post
              </MenuLink>
            </NavItem>
            <NavItem>
              <MenuLink href="/hello">Hello</MenuLink>
            </NavItem>
            <MeComponent>
              {({ data, loading }) => {
                if (!data || loading || !data.me) {
                  return (
                    <>
                      <NavItem>
                        <MenuLink
                          className="btn btn-primary ml-3"
                          href="/login"
                        >
                          Login
                        </MenuLink>
                      </NavItem>
                      <NavItem>
                        <MenuLink
                          className="btn btn-secondary ml-3"
                          href="/register"
                        >
                          Register
                        </MenuLink>
                      </NavItem>
                    </>
                  );
                }
                return (
                  <NavItem>
                    <MenuLink className="btn btn-secondary ml-3" href="/logout">
                      Logout
                    </MenuLink>
                  </NavItem>
                );
              }}
            </MeComponent>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
