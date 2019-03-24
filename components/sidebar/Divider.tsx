import * as React from 'react';

interface DividerProps {
  className?: string;
}

const Divider: React.FunctionComponent<DividerProps> = props => {
  return <hr className={`sidebar-divider ${props.className}`} />;
};

export default Divider;
