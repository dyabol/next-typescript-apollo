import { Container } from 'unstated';

type SidebarState = {
  toggled: boolean;
};

export default class SidebarContainer extends Container<SidebarState> {
  public state = {
    toggled: false
  };

  public toggle = () => {
    this.setState({ toggled: !this.state.toggled });
  };
}
