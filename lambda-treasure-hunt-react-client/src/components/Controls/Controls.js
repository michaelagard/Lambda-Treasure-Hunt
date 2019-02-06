import React, { Component } from "react";
import styled from "styled-components";

const ControlsWrapper = styled.div`
  width: 18%;
  height: 100px;
  border: 5px solid black;
`;

class Controls extends Component {
  render() {
    return <ControlsWrapper>Controls</ControlsWrapper>;
  }
}

export default Controls;
