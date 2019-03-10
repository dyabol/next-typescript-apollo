import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem
} from 'reactstrap';
import { MeComponent } from '../generated/apolloComponents';
import withIntl from '../lib/withIntl';
import MenuLink from './MenuLink';

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
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <MenuLink prefetch={true} href="/">
                {intl.formatMessage({
                  id: 'home',
                  defaultMessage: 'Home'
                })}
              </MenuLink>
            </NavItem>
            <NavItem>
              <MenuLink href={'/posts'}>
                {intl.formatMessage({
                  id: 'posts',
                  defaultMessage: 'Posts'
                })}
              </MenuLink>
            </NavItem>
            <NavItem>
              <MenuLink href="/hello">
                {intl.formatMessage({
                  id: 'hello',
                  defaultMessage: 'Hello'
                })}
              </MenuLink>
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
                          {intl.formatMessage({
                            id: 'login',
                            defaultMessage: 'Login'
                          })}
                        </MenuLink>
                      </NavItem>
                      <NavItem>
                        <MenuLink
                          className="btn btn-secondary ml-3"
                          href="/register"
                        >
                          {intl.formatMessage({
                            id: 'registration',
                            defaultMessage: 'Registration'
                          })}
                        </MenuLink>
                      </NavItem>
                    </>
                  );
                }
                return (
                  <NavItem>
                    <MenuLink className="btn btn-secondary ml-3" href="/logout">
                      {intl.formatMessage({
                        id: 'logout',
                        defaultMessage: 'Logout'
                      })}
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

export default withIntl(Menu);
