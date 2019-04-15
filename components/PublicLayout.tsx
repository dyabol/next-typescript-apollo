import Head from "next/head";
import * as React from "react";

export interface IProps {
  readonly title?: string;
}

export default class PublicLayout extends React.Component<IProps, {}> {
  /**
   * Main page title
   */
  private pageName: string = "Page Name";

  public render() {
    const { children } = this.props;
    return (
      <div className="content">
        <Head>
          <title>{this.getTitle()}</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
            key="viewport"
          />
        </Head>
        <div className="mt-3 container">{children}</div>
      </div>
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
