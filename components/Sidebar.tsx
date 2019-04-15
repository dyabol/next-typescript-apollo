import { Icon, Layout, Menu } from "antd";
import Link from "next/link";
import { SingletonRouter, withRouter } from "next/router";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Subscribe } from "unstated";
import SidebarContainer from "../containers/SidebarContainer";
const { Sider } = Layout;

const SubMenu = Menu.SubMenu;

export interface ISidebarProps {
  router: SingletonRouter<Record<string, string | string[] | undefined>>;
}

interface ISubMenu {
  content: string[];
  personal: string[];
  [key: string]: string[];
}

class Sidebar extends React.Component<ISidebarProps, {}> {
  public subMenu: ISubMenu = {
    content: ["/posts", "/pages", "/menus"],
    personal: ["/profile", "/users"]
  };
  private sidebarStore: SidebarContainer;

  constructor(props: ISidebarProps) {
    super(props);
    this.sidebarStore = new SidebarContainer({
      opened: this.getDefaultOpenKeys()
    });
  }

  public getDefaultOpenKeys = () => {
    for (const key in this.subMenu) {
      if (this.subMenu.hasOwnProperty(key)) {
        const items = this.subMenu[key];
        if (items.indexOf(this.props.router.pathname) > -1) {
          return [key];
        }
      }
    }
    return [];
  };

  public render() {
    const { router } = this.props;
    return (
      <Subscribe to={[this.sidebarStore]}>
        {({ toggle, open, state }: SidebarContainer) => (
          <Sider collapsible collapsed={state.toggled} onCollapse={toggle}>
            <div className="logo" />
            <Menu
              theme="dark"
              defaultSelectedKeys={["/"]}
              selectedKeys={[router.pathname]}
              mode="inline"
              onOpenChange={openKeys => {
                const latestOpenKey = openKeys.find(
                  key => state.opened.indexOf(key) === -1
                );
                if (
                  latestOpenKey &&
                  Object.keys(this.subMenu).indexOf(latestOpenKey) === -1
                ) {
                  open(openKeys);
                } else {
                  open(latestOpenKey ? [latestOpenKey] : []);
                }
              }}
              openKeys={state.opened}
            >
              <Menu.Item key="/">
                <Link href="/">
                  <a>
                    <Icon type="dashboard" />
                    <FormattedMessage
                      id="dashboard"
                      defaultMessage="Dashboard"
                    />
                  </a>
                </Link>
              </Menu.Item>
              <SubMenu
                key="content"
                title={
                  <span>
                    <Icon type="folder-open" />
                    <FormattedMessage id="content" defaultMessage="Content" />
                  </span>
                }
              >
                <Menu.Item key="/posts">
                  <Link href="/posts">
                    <a>
                      <FormattedMessage id="posts" defaultMessage="Posts" />
                    </a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/pages">
                  <Link href="/pages">
                    <a>
                      <FormattedMessage id="pages" defaultMessage="Pages" />
                    </a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/menus">
                  <Link href="/menus">
                    <a>
                      <FormattedMessage id="menus" defaultMessage="Menus" />
                    </a>
                  </Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="/media">
                <Link href="/media">
                  <a>
                    <Icon type="picture" />
                    <FormattedMessage id="media" defaultMessage="Media" />
                  </a>
                </Link>
              </Menu.Item>
              <SubMenu
                key="personal"
                title={
                  <span>
                    <Icon type="team" />
                    <FormattedMessage id="personal" defaultMessage="Personal" />
                  </span>
                }
              >
                <Menu.Item key="/profile">
                  <Link href="/profile">
                    <a>
                      <FormattedMessage id="profile" defaultMessage="Profile" />
                    </a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/users">
                  <Link href="/users">
                    <a>
                      <FormattedMessage id="users" defaultMessage="Users" />
                    </a>
                  </Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="/setting">
                <Link href="/settings">
                  <a>
                    <Icon type="setting" />
                    <FormattedMessage id="settings" defaultMessage="Settings" />
                  </a>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
        )}
      </Subscribe>
    );
  }
}

export default withRouter(Sidebar);
