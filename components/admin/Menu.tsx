import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Subscribe } from 'unstated';
import SidebarContainer from '../../containers/admin/SidebarContainer';

export interface MenuProps {}

export interface MenuState {}

class Menu extends React.Component<MenuProps, MenuState> {
  public render() {
    return (
      <Subscribe to={[SidebarContainer]}>
        {({ toggle }: SidebarContainer) => (
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <button
              onClick={toggle}
              id="sidebarToggleTop"
              className="btn btn-link d-md-none rounded-circle mr-3"
            >
              <FontAwesomeIcon icon="bars" />
            </button>
          </nav>
        )}
      </Subscribe>
    );
  }
}

export default Menu;
