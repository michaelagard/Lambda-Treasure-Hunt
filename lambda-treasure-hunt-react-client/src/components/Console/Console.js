import React, { Component } from "react";
import styled from "styled-components";

const ConsoleWrapper = styled.div`
  width: 80%;
  border: 5px solid black;
`;

class Console extends Component {
  render() {
    return <ConsoleWrapper>Console</ConsoleWrapper>;
  }
}

export default Console;
