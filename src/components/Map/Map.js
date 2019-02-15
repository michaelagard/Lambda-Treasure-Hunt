import React, { Component } from "react";
import styled from "styled-components";
class Map extends Component {
  componentDidMount() {}

  generateMapObject = () => {
    let mapRooms = [];
    let exitHalls = [];
    let map = JSON.parse(localStorage.getItem("map"));

    for (let roomId in map) {
      let coordinates = map[roomId]["coordinates"];
      coordinates = [coordinates[0] - 45, 30 - (coordinates[1] - 55)];
      let exits = map[roomId]["coordinates"][1];

      for (let exit in exits) {
        if (exit === "n") {
          exitHalls.push(
            <Exits
              key={map[roomId]}
              className={map[roomId]}
              inputLeft={`${coordinates[0] * 30}px`}
              inputTop={`${coordinates[1] * 30}px`}
            />
          );
        }
      }

      mapRooms.push(
        <Room
          key={roomId}
          className={roomId}
          inputLeft={`${coordinates[0] * 30}px`}
          inputTop={`${coordinates[1] * 30}px`}
          inputBackground={
            Number(roomId) === this.props.roomId ? `red` : `grey`
          }
        >
          {roomId}
        </Room>
      );
    }
    return mapRooms;
  };

  render() {
    return <React.Fragment>{this.generateMapObject()}</React.Fragment>;
  }
}

export default Map;

const Room = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 20px;
  height: 20px;
  left: ${props => props.inputLeft || "30px"};
  top: ${props => props.inputTop || "30px"};
  background: ${props => props.inputBackground || "lightgrey"};
  font-size: 12px;
`;
const Exits = styled.div`
  position: absolute;
  display: blocl;
  width: 6px;
  height: 6px;
  background: black;
  left: ${props => props.inputLeft || "30px"};
  top: ${props => props.inputTop || "30px"};
`;
