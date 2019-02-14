import React, { Component } from "react";
import styled from "styled-components";
const Room = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid black;
  background: grey;
`;
class Map extends Component {
  /* Map Generation
  Step 1:
  Get the max x and max y coordinate
  Get the min x and min y coordinate
  Find the difference between the x's and y's
  
  */
  generateGraph = (coords) => {
    for (let i = 0)
  }
  render() {
    return (
      <div className="Map">
        <Room />
      </div>
    );
  }
}

export default Map;
