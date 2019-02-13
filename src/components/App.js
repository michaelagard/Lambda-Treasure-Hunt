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
    cooldown: 4,
    errors: [],
    messages: [],
    antiCompass: { n: "s", s: "n", e: "w", w: "e" }
  };

  componentDidMount() {
    axios
      .get(`https://lambda-treasure-hunt.herokuapp.com/api/adv/init/`)
      .then(res => {
        this.updateState(res.data);
        if (!localStorage.getItem("map")) {
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
        }
      });
  }

  updateState = newState => {
    this.setState({
      roomId: newState.room_id,
      title: newState.title,
      description: newState.description,
      coordinates: newState.coordinates,
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

  addToLocalStorageMap = update => {
    let oldMap = JSON.parse(localStorage.getItem("map"));
    let newMap = Object.assign({}, update, oldMap);
    localStorage.setItem("map", JSON.stringify(newMap));
  };

  autoMoveTest = () => {
    this.counter = this.state.cooldown;
    this.timerID = setInterval(() => {
      this.cooldownCountdown();
    }, 1000);
  };

  cooldownCountdown = () => {
    this.setState({
      cooldown: this.state.cooldown - 1
    });
    if (this.state.cooldown <= 0) {
      clearInterval(this.timerID);
    }
  };

  generateExitsObject = exits => {
    let newExits = {};
    for (let i = 0; i < exits.length; i++) {
      newExits[exits[i]] = "?";
    }
    return newExits;
  };

  addNewRoomToExit = (newRoom, previousRoom, direction) => {
    console.log("Does this run?");

    let map = JSON.parse(localStorage.getItem("map"));

    map[previousRoom]["exits"][direction] = newRoom;

    console.log(`${map[previousRoom]["exits"][direction]}`);

    map[newRoom]["exits"][this.state.antiCompass[direction]] = previousRoom;
    console.log(
      `map[newRoom]["exits"][this.state.antiCompass[direction]] ${
        map[newRoom]["exits"][this.state.antiCompass[direction]]
      }: ${previousRoom}`
    );

    console.log(map);

    this.addToLocalStorageMap(map);
  };

  playerMove = direction => {
    let prevRoom = this.state.roomId;
    this.autoMoveTest();
    axios
      .post(`https://lambda-treasure-hunt.herokuapp.com/api/adv/move/`, {
        direction: direction
      })
      .then(res => {
        this.updateState(res.data);
        console.log(res.data);

        if (!(res.data.room_id in JSON.parse(localStorage.getItem("map")))) {
          this.addToLocalStorageMap({
            [res.data.room_id]: {
              coordinates: res.data.coordinates,
              exits: this.generateExitsObject(res.data.exits, res.data.room_id)
            }
          });
        }
        this.addNewRoomToExit(res.data.room_id, prevRoom, direction);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        <button
          disabled={this.state.cooldown >= 2}
          onClick={() => this.playerMove("n")}
        >
          n
        </button>
        <button
          disabled={this.state.cooldown >= 2}
          onClick={() => this.playerMove("s")}
        >
          s
        </button>
        <button
          disabled={this.state.cooldown >= 2}
          onClick={() => this.playerMove("e")}
        >
          e
        </button>
        <button
          disabled={this.state.cooldown >= 2}
          onClick={() => this.playerMove("w")}
        >
          w
        </button>
        <button onClick={() => this.autoMoveTest()}>Counter Test</button>
        <Controls />
        <Infobar />
        <Map />

        <ul>
          <li>Coordinates: {this.state.coordinates}</li>
          <li>Exits: {this.state.exits}</li>
          <li>Cooldown: {this.state.cooldown}</li>
          <li>Room ID: {this.state.roomId}</li>
          <li>Players: {this.state.players}</li>
          <li>Errors: {this.state.errors}</li>
          <li>Messages: {this.state.messages}</li>
        </ul>
      </div>
    );
  }
}

export default App;
