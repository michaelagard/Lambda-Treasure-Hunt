import React, { Component } from "react";
import styled from "styled-components";
import Console from "../Console/Console";
import Controls from "../Controls/Controls";
import Sidebar from "../Sidebar/Sidebar";
import Map from "../Map/Map";
import { connect } from "react-redux";
import { checkStatus, playerMove, playerInitialization } from "../../actions";
class App extends Component {
  state = {
    console: [],
    auto: true
  };

  componentDidMount() {
    this.props.checkStatus();
    this.props.playerInitialization();
  }

  componentWillReceiveProps(np) {
    // Check if room data changes and updates the console with new data
    if (np.room !== this.props.room) {
      let consoleData = this.state.console;
      let msg = [
        <hr />,
        `Exits: ${np.room.exits}`,
        np.room.description,
        np.room.messages
      ];
      for (let i = 0; i < msg.length; i++) {
        consoleData.splice(0, 0, msg[i]);
      }
      this.setState({
        console: consoleData
      });
      // Add new data to map
      if (np.room.coordinates !== this.props.coordinates) {
        this.addToLocalStorage({
          [np.room.room_id]: { coordinates: np.room.coordinates }
        });
      }
    }
  }

  addToLocalStorage = update => {
    let oldMap = JSON.parse(localStorage.getItem("map"));
    let newMapData = update;
    let newMap = Object.assign(newMapData, oldMap);
    localStorage.setItem("map", JSON.stringify(newMap));
  };

  handleControls = input => {
    if (input.match(/^(n|w|s|e)$/)) {
      this.props.playerMove({ direction: input });
    }
  };

  checkInventory = () => {
    this.props.checkStatus();
  };

  // ------------------------ \\
  // Traversal Code Goes Here \\
  // ------------------------ \\

  breadthFirstTraversal = () => {
    const traversalPath = [];
    const map = JSON.parse(localStorage.getItem("map"));

    let visitingRoom = this.props.room.room_id;
    let reverseDirection = {
      n: "s",
      s: "n",
      w: "e",
      e: "w"
    };

    function generateRoom() {
      console.log("does this work?");

      if (Object.values(map).includes(visitingRoom)) {
        return null;
      } else {
        for (let path of map[visitingRoom]) {
          if (map[visitingRoom][path] === "?") {
            return path;
          }
        }
      }
    }

    function firstDirection() {
      for (let path of this.map[visitingRoom]) {
        if (map[visitingRoom][path] === "?") {
          return path;
        }
      }
    }

    function travel(direction) {
      let previousRoom = this.props.room.room_id;
      console.log("We're moving!");

      if (direction) {
        setTimeout(function() {
          travel(direction);
          this.props.playerMove({ direction: direction });
          generateRoom();
          map[visitingRoom][reverseDirection[direction]] = previousRoom;
          map[previousRoom][direction] = visitingRoom;
          traversalPath.append(direction);
        }, 10000);
      } else {
        let roomList = backtrackToNearestUnexploredRoom();

        if (roomList.length === 0) {
          return false;
        }

        for (let direction in roomsToDirections(roomList)) {
          travel(direction);
          traversalPath.append(direction);
        }
      }
      return true;
    }

    function backtrackToNearestUnexploredRoom() {
      let queue = [];
      let visited = [];
      queue.push([visitingRoom]);

      while (queue.length > 0) {
        let path = queue.shift();
        let node = path[queue.length - 1];

        if (node.includes(visited)) {
          return null;
        } else {
          for (let exit in map[node]) {
            if (map[node][exit] === "?") {
              return path;
            } else {
              let upath = path;
              upath.append(map[node][exit]);
              queue.push(upath);
            }
          }
        }
      }
      return [];
    }

    function roomsToDirections(roomList) {
      let currentRoom = roomList[0];
      let directionList = [];
      for (let room in roomList.slice(1)) {
        for (let exit in map[currentRoom]) {
          if (map[currentRoom][exit] === room) {
            directionList.append(exit);
            currentRoom = room;
            break;
          }
        }
      }
      return directionList;
    }
    while (this.state.auto) {
      generateRoom();
      if (!travel(firstDirection)) {
        this.setState({ auto: false });
      }
    }
  };

  // ------------------------ \\
  render() {
    return (
      <AppWrapper>
        <TopWrapper>
          <Map />
          <Sidebar status={this.props.status} room={this.props.room} />
        </TopWrapper>
        <BottomWrapper>
          <Console data={this.state.console} />
          <Controls
            checkInventory={this.checkInventory}
            handleControls={this.handleControls}
            startAuto={this.breadthFirstTraversal}
          />
        </BottomWrapper>
      </AppWrapper>
    );
  }
}

const AppWrapper = styled.div`
  display: flex;
  padding: 8px;
  flex-direction: column;
  height: 100vh;
`;

const TopWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 77%;
  justify-content: space-around;
  margin-bottom: 1%;
`;

const BottomWrapper = styled.div`
  display: flex;
  width: 100%;
  max-height: 20%;
  height: 20%;
  justify-content: space-around;
`;

const mapStateToProps = state => ({
  status: state.status,
  room: state.room,
  fetching_status: state.fetching,
  fetch_status_error: state.error
});

export default connect(
  mapStateToProps,
  { checkStatus, playerMove, playerInitialization }
)(App);
