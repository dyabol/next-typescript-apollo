import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';
import { MeComponent } from '../../../generated/apolloComponents';

export interface UserProps {}
export interface UserState {
  isOpen: boolean;
}

export default class User extends React.Component<UserProps, UserState> {
  public state = {
    isOpen: false
  };
  private open = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  public render() {
    return (
      <MeComponent>
        {({ data }) => {
          if (data && data.me) {
            return (
              <UncontrolledDropdown
                className="no-arrow"
                nav
                inNavbar
                isOpen={this.state.isOpen}
                toggle={this.open}
              >
                <DropdownToggle id="userDropdown" nav caret>
                  <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                    {data.me.fullName}
                  </span>
                  {data.me.avatar ? (
                    <img
                      className="img-profile rounded-circle"
                      src={data.me.avatar}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon="user-tie"
                      className="rounded-circle"
                    />
                  )}
                </DropdownToggle>
                <DropdownMenu right className="shadow animated--grow-in">
                  <Link href="/admin/profile">
                    <DropdownItem>
                      <FontAwesomeIcon
                        fixedWidth
                        size="sm"
                        icon="user-tie"
                        className="mr-2 text-gray-400"
                      />
                      <FormattedMessage id="profile" defaultMessage="Profile" />
                    </DropdownItem>
                  </Link>
                  <Link href="/admin">
                    <DropdownItem>
                      <FontAwesomeIcon
                        fixedWidth
                        size="sm"
                        icon="cog"
                        className="mr-2 text-gray-400"
                      />
                      <FormattedMessage
                        id="settings"
                        defaultMessage="Settings"
                      />
                    </DropdownItem>
                  </Link>
                  <DropdownItem divider />
                  <Link href="/logout" shallow>
                    <DropdownItem>
                      <FontAwesomeIcon
                        fixedWidth
                        size="sm"
                        icon="sign-out-alt"
                        className="mr-2 text-gray-400"
                      />
                      <FormattedMessage id="logout" defaultMessage="Logout" />
                    </DropdownItem>
                  </Link>
                </DropdownMenu>
              </UncontrolledDropdown>
            );
          }
          return null;
        }}
      </MeComponent>
    );
  }
}
