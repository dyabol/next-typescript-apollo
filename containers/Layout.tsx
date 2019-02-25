import Head from 'next/head';

import * as React from 'react';

export type Props = {
  readonly title?: string;
};

export default class Layout extends React.Component<Props, {}> {
  /**
   * Main page title
   */
  private pageName: string = 'Page Name';

  /**
   * Return page title
   */
  private getTitle(): string {
    if (this.props.title) {
      return this.props.title + ' | ' + this.pageName;
    }
    return this.pageName;
  }

  public render() {
    return (
      <div>
        <Head>
          <title>{this.getTitle()}</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
            key="viewport"
          />
        </Head>
        {this.props.children}
      </div>
    );
  }
}
