import React, { Component } from "react";
import styled from "styled-components";

const MapWrapper = styled.div`
  width: 80%;
  height: 100px;
  border: 5px solid black;
`;

class Map extends Component {
  render() {
    return <MapWrapper>Map</MapWrapper>;
  }
}

export default Map;
