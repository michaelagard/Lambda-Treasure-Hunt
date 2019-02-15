import React, { Component } from "react";
import styled from "styled-components";
import dragscroll from "dragscroll"; // eslint-disable-line no-unused-vars

class Map extends Component {
  generateMapObject = () => {
    let mapRooms = [];
    let exitHalls = [];
    let map = JSON.parse(localStorage.getItem("map"));

    for (let roomId in map) {
      let coordinates = map[roomId]["coordinates"];
      coordinates = [coordinates[0] - 48, 30 - (coordinates[1] - 44)];
      let exits = map[roomId]["exits"];
      let inputLeftExitVar = 32;
      let inputTopExitVar = 32;
      let inputLeftRoomVar = 32;
      let inputTopRoomVar = 32;
      for (let exit in exits) {
        if (exit === "n") {
          exitHalls.push(
            <Exits
              key={roomId + exit}
              className={roomId + exit}
              inputLeft={`${coordinates[0] * inputLeftExitVar + 7}px`}
              inputTop={`${coordinates[1] * inputTopExitVar - 6}px`}
            />
          );
        } else if (exit === "s") {
          exitHalls.push(
            <Exits
              key={roomId + exit}
              className={roomId + exit}
              inputLeft={`${coordinates[0] * inputLeftExitVar + 7}px`}
              inputTop={`${coordinates[1] * inputTopExitVar + 20}px`}
            />
          );
        } else if (exit === "e") {
          exitHalls.push(
            <Exits
              key={roomId + exit}
              className={roomId + exit}
              inputLeft={`${coordinates[0] * inputLeftExitVar + 20}px`}
              inputTop={`${coordinates[1] * inputTopExitVar + 7}px`}
            />
          );
        } else if (exit === "w") {
          exitHalls.push(
            <Exits
              key={roomId + exit}
              className={roomId + exit}
              inputLeft={`${coordinates[0] * inputLeftExitVar - 6}px`}
              inputTop={`${coordinates[1] * inputTopExitVar + 7}px`}
            />
          );
        }
      }

      mapRooms.push(
        <Room
          key={roomId}
          className={roomId}
          inputLeft={`${coordinates[0] * inputLeftRoomVar}px`}
          inputTop={`${coordinates[1] * inputTopRoomVar}px`}
          inputBackground={
            Number(roomId) === this.props.roomId ? `red` : `grey`
          }
        >
          {roomId}
        </Room>
      );
    }
    return mapRooms.concat(exitHalls);
  };

  render() {
    return (
      <MapWrapper className={"dragscroll"}>
        {this.generateMapObject()}
      </MapWrapper>
    );
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
  display: block;
  width: 6px;
  height: 6px;
  background: black;
  left: ${props => props.inputLeft || "32px"};
  top: ${props => props.inputTop || "32px"};
  z-index: 0;
`;

const MapWrapper = styled.div`
  display: flex;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
