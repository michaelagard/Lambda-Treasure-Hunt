import React, { Component } from "react";
import styled from "styled-components";

const Room = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  left: ${props => props.inputLeft || "30px"};
  top: ${props => props.inputTop || "30px"};
  background: grey;
`;
class Map extends Component {
  /* Map Generation
  1. Get the max x and max y coordinate
  for roomId in roomGraph:
    coordinates = roomGraph[roomId][0]
    exits = roomGraph[roomId][1]
  2. Get the min x and min y coordinate
  3. Find the difference between the x's and y's
  4. plot out matrix of <Room/>s with the dimension of x and y from step 3.
  5. add classes to each room starting with the smallest x and y and increment x from left to right and y to top to bottom
  */
  componentDidMount() {}

  render() {
    let mapObject = JSON.parse(localStorage.getItem("map"));
    let mapRooms = [];
    for (let roomId in mapObject) {
      let coordinates = mapObject[roomId]["coordinates"];

      coordinates = [coordinates[0] - 45, 30 - (coordinates[1] - 55)];

      // let exits = mapObject[roomId]["coordinates"][1]; // will get to this later

      // style += `left: ${coordinates[0] * 30}px; top:${coordinates[1] * 30}px;`; // apply to styled components
      mapRooms.push(
        <Room
          key={mapObject[roomId]}
          className={mapObject[roomId]}
          inputLeft={`${coordinates[0] * 30}px`}
          inputTop={`${coordinates[1] * 30}px`}
        />
      );
    }
    return <React.Fragment>{mapRooms}</React.Fragment>;
  }
}

export default Map;
