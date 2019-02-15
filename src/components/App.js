import React, { Component } from "react";
import axios from "axios";

import Controls from "../components/Controls/Controls";
import Infobar from "../components/Infobar/Infobar";
import Map from "../components/Map/Map";

axios.defaults.headers.common["Authorization"] = `Token ${
  process.env.REACT_APP_AUTH_TOKEN
}`;

class App extends Component {
  state = {
    roomId: 0,
    title: "",
    description: "",
    coordinates: "",
    elevation: 0,
    terrain: "",
    players: [],
    items: [],
    exits: [],
    cooldown: 3,
    errors: [],
    messages: [],
    antiCompass: { n: "s", s: "n", e: "w", w: "e" },
    auto: true,
    canMove: true
  };

  componentDidMount() {
    axios
      .get(`https://lambda-treasure-hunt.herokuapp.com/api/adv/init/`)
      .then(res => {
        this.updateState(res.data);
        if (!localStorage.getItem("map")) {
          console.log("THERE IS NO MAP");
          localStorage.setItem("map", JSON.stringify({}));
          if (!(this.state.roomId in JSON.parse(localStorage.getItem("map")))) {
            this.addToLocalStorageMap({
              [this.state.roomId]: {
                coordinates: this.state.coordinates,
                exits: this.generateExitsObject(
                  this.state.exits,
                  this.state.roomId
                )
              }
            });
          }
        } else {
          this.stringifyExits();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateState = newState => {
    this.setState({
      roomId: newState.room_id,
      title: newState.title,
      description: newState.description,
      coordinates: newState.coordinates.replace(/["()]/gi, "").split(","),
      elevation: newState.elevation,
      terrain: newState.terrain,
      players: newState.players,
      items: newState.items,
      exits: newState.exits,
      cooldown: newState.cooldown,
      errors: newState.errors,
      messages: newState.messages
    });
  };

  stringifyExits = () => {
    let map = JSON.parse(localStorage.getItem("map"));
    let exitString = "";
    for (let x in map[this.state.roomId]["exits"]) {
      exitString += `${x}: ${map[this.state.roomId]["exits"][x]} | `;
    }
    this.setState({
      exits: exitString
    });
  };

  addToLocalStorageMap = update => {
    let oldMap = JSON.parse(localStorage.getItem("map"));
    let newMap = Object.assign({}, oldMap, update);
    localStorage.setItem("map", JSON.stringify(newMap));
  };

  autoMovement = () => {
    this.cooldownTimer = setInterval(() => {
      this.cooldownCountdown();
    }, 1000);
  };

  cooldownCountdown = () => {
    this.setState({
      cooldown: this.state.cooldown - 1
    });

    if (this.state.cooldown <= 0) {
      clearInterval(this.cooldownTimer);
      this.setState({
        cooldown: 3
      });
      if (this.newDirection()) {
        this.playerMove(this.newDirection());
      } else {
        console.log("No available directions");
      }
    }
  };

  newDirection = () => {
    let map = JSON.parse(localStorage.getItem("map"));
    for (let path in map[this.state.roomId]["exits"]) {
      if (map[this.state.roomId]["exits"][path] === "?") {
        console.log(`Moving to the available path at: ${path}`);
        return path;
      }
    }
    return false;
  };

  generateExitsObject = exits => {
    let newExits = {};
    for (let i = 0; i < exits.length; i++) {
      newExits[exits[i]] = "?";
    }
    return newExits;
  };

  addNewRoomToExit = (newRoom, previousRoom, direction) => {
    let map = JSON.parse(localStorage.getItem("map"));
    map[previousRoom]["exits"][direction] = newRoom;
    map[newRoom]["exits"][this.state.antiCompass[direction]] = previousRoom;
    this.addToLocalStorageMap(map);
  };

  playerMove = direction => {
    let prevRoom = this.state.roomId;
    axios
      .post(`https://lambda-treasure-hunt.herokuapp.com/api/adv/move/`, {
        direction: direction
      })
      .then(res => {
        this.updateState(res.data);
        if (!(res.data.room_id in JSON.parse(localStorage.getItem("map")))) {
          this.addToLocalStorageMap({
            [res.data.room_id]: {
              coordinates: res.data.coordinates
                .replace(/["()]/gi, "")
                .split(","),
              exits: this.generateExitsObject(res.data.exits, res.data.room_id)
            }
          });
        }
        this.addNewRoomToExit(res.data.room_id, prevRoom, direction);
        this.stringifyExits();
        if (this.state.auto) {
          this.autoMovement();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  /*** Look at each exit
   * for every one that doesn't have an id
   * check coord in that direction for a room I have explored before
   * assign
   */
  render() {
    return (
      <div className="App">
        <button
          disabled={this.state.canMove === false}
          onClick={() => this.playerMove("n")}
        >
          n
        </button>
        <button
          disabled={this.state.canMove === false}
          onClick={() => this.playerMove("s")}
        >
          s
        </button>
        <button
          disabled={this.state.canMove === false}
          onClick={() => this.playerMove("e")}
        >
          e
        </button>
        <button
          disabled={this.state.canMove === false}
          onClick={() => this.playerMove("w")}
        >
          w
        </button>
        <button onClick={() => this.autoMovement()}>
          Move To Unexplored Room
        </button>
        <button
          onClick={() => {
            this.state.auto
              ? this.setState({ auto: false })
              : this.setState({ auto: true });
          }}
        >
          Toggle Auto
        </button>
        <button
          onClick={() => {
            this.sendCoordsToMap();
          }}
        >
          Temp Button
        </button>
        <Controls />
        <Infobar />
        <Map roomId={this.state.roomId} />

        <ul>
          <li>Coordinates: {this.state.coordinates}</li>
          <li>Exits: {this.state.exits}</li>
          <li>Cooldown: {this.state.cooldown}</li>
          <li>Room ID: {this.state.roomId}</li>
          <li>Players: {this.state.players}</li>
          <li>Errors: {this.state.errors}</li>
          <li>Messages: {this.state.messages}</li>
          <li>Messages: {this.state.description}</li>
        </ul>
      </div>
    );
  }
}

export default App;
