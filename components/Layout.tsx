import { Layout as AntLayout } from "antd";
import Head from "next/head";
import * as React from "react";
import { Provider } from "unstated";
import { MeComponent } from "../generated/apolloComponents";
import Content from "./Content";
import Loading from "./Loading";
import Sidebar from "./Sidebar";

export interface IProps {
  readonly title?: string;
}

export default class Layout extends React.Component<IProps, {}> {
  /**
   * Main page title
   */
  private pageName: string = "Admin";

  public render() {
    const { children } = this.props;
    return (
      <MeComponent>
        {({ data }) =>
          data && data.me ? (
            <AntLayout className="admin" style={{ minHeight: "100vh" }}>
              <Head>
                <title>{this.getTitle()}</title>
                <meta
                  name="viewport"
                  content="initial-scale=1.0, width=device-width"
                  key="viewport"
                />
              </Head>
              <Provider>
                <Sidebar />
                <Content>{children}</Content>
              </Provider>
            </AntLayout>
          ) : (
            <Loading />
          )
        }
      </MeComponent>
    );
  }

  /**
   * Return page title
   */
  private getTitle(): string {
    if (this.props.title) {
      return this.props.title + " | " + this.pageName;
    }
    return this.pageName;
  }
}
