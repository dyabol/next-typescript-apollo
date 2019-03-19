import * as React from 'react';
import { Subscribe } from 'unstated';
import SidebarContainer from '../../../containers/admin/SidebarContainer';
import Divider from './Divider';

export interface ContainerProps {}

export interface ContainerState {}

export default class Container extends React.Component<
  ContainerProps,
  ContainerState
> {
  public render() {
    const { children } = this.props;
    return (
      <Subscribe to={[SidebarContainer]}>
        {({ toggle, state }: SidebarContainer) => (
          <ul
            className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${state.toggled &&
              'toggled'}`}
            id="accordionSidebar"
          >
            {children}
            <Divider />
            <div className="text-center d-none d-md-inline">
              <button
                onClick={toggle}
                className="rounded-circle border-0"
                id="sidebarToggle"
              />
            </div>
          </ul>
        )}
      </Subscribe>
    );
  }
}
