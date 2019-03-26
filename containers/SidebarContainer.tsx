import { Container } from 'unstated';

type SidebarState = {
  toggled: boolean;
  opened: string[];
};

export default class SidebarContainer extends Container<SidebarState> {
  constructor(props: any = {}) {
    super();
    this.state = {
      toggled: false,
      opened: props.opened
    };
  }

  public toggle = () => {
    this.setState({ toggled: !this.state.toggled });
  };

  public open = (openKeys: string[]) => {
    this.setState({ opened: openKeys });
  };
}

export const sidebarStore = new SidebarContainer();
