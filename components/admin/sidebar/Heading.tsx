import * as React from 'react';

interface HeadingProps {}

const Heading: React.FunctionComponent<HeadingProps> = props => {
  return <div className="sidebar-heading">{props.children}</div>;
};

export default Heading;
