import * as React from 'react';
import '../styles/global.scss';

export interface IndexProps {}

export default class Index extends React.Component<IndexProps, {}> {
  public render() {
    return <div className="example">Hello World!</div>;
  }
}
