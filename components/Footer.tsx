import * as React from "react";
import styled from "styled-components";

const Foot = styled("div")`
  background: #343a40;
  color: white;
  padding: 0.5em 1em;
  text-align: center;
`;

export default class Footer extends React.Component<{}, any> {
  public render() {
    return <Foot>Jakub Hromek &copy; 2019</Foot>;
  }
}
