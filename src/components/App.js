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
    cooldown: 0,
    room: {
      room_id: 0,
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
      messages: []
    },
    player: {}
  };

  componentDidMount() {
    if (!localStorage.getItem("map")) {
      localStorage.setItem("map", JSON.stringify({}));
    }
    axios
      .get(`https://lambda-treasure-hunt.herokuapp.com/api/adv/init/`)
      .then(res => {
        this.setState({ room: res.data });
      });
  }

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

  addNewRoomToExit = (newRoom, direction) => {
    console.log("Does this run?");
    // THIS LOGIC IS BACKWARDS, COME BACK TO THIS ONCE YOU'VE EATEN
    let map = JSON.parse(localStorage.getItem("map"));
    map[this.state.room.room_id]["exits"][direction] = this.state.room.room_id;
    map[newRoom]["exits"][direction] = newRoom;
    console.log(map);

    this.addToLocalStorageMap(map);
  };

  playerMove = direction => {
    this.autoMoveTest();
    axios
      .post(`https://lambda-treasure-hunt.herokuapp.com/api/adv/move/`, {
        direction: direction
      })
      .then(res => {
        this.setState({ room: res.data, cooldown: res.data.cooldown });
        if (!(res.data.room_id in JSON.parse(localStorage.getItem("map")))) {
          this.addToLocalStorageMap({
            [res.data.room_id]: {
              coordinates: res.data.coordinates,
              exits: this.generateExitsObject(res.data.exits, res.data.room_id)
            }
          });
        }
        this.addNewRoomToExit(res.data.room_id, direction);
      });
  };

  render() {
    return (
      <div className="App">
        <button
          disabled={this.state.cooldown >= 1}
          onClick={() => this.playerMove("n")}
        >
          n
        </button>
        <button
          disabled={this.state.cooldown >= 1}
          onClick={() => this.playerMove("s")}
        >
          s
        </button>
        <button
          disabled={this.state.cooldown >= 1}
          onClick={() => this.playerMove("e")}
        >
          e
        </button>
        <button
          disabled={this.state.cooldown >= 1}
          onClick={() => this.playerMove("w")}
        >
          w
        </button>
        <button onClick={() => this.autoMoveTest()}>Counter Test</button>
        <Controls />
        <Infobar />
        <Map />

        <ul>
          <li>Coordinates: {this.state.room.coordinates}</li>
          <li>Exits: {this.state.room.exits}</li>
          <li>Cooldown: {this.state.cooldown}</li>
          <li>Room ID: {this.state.room.room_id}</li>
          <li>Players: {this.state.room.players}</li>
          <li>Errors: {this.state.room.errors}</li>
          <li>Messages: {this.state.room.messages}</li>
        </ul>
      </div>
    );
  }
}

export default App;
