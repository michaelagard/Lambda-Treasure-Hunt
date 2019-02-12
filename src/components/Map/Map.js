import React, { Component } from "react";
import styled from "styled-components";
const Room = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid black;
  background: grey;
`;
class Map extends Component {
  render() {
    return (
      <div className="Map">
        test
        <Room />
      </div>
    );
  }
}

export default Map;
