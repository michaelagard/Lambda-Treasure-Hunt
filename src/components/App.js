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
    cooldown: 6,
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
      cooldown: 6,
      errors: [],
      messages: []
    },
    player: {}
  };
  counter = this.state.cooldown;
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
    this.timerID = setInterval(() => {
      this.cooldownCountdown();
    }, 1000);
  };

  cooldownCountdown = () => {
    this.counter -= 1;
    this.setState({
      cooldown: this.counter
    });
    if (this.state.cooldown <= 0) {
      clearInterval(this.timerID);
    }
  };

  generateExitsObject = exits => {
    let exitPaths = {};
    for (let i = 0; i < exits.length; i++) {
      exitPaths[exits[i]] = "?";
    }
    return exitPaths;
  };

  playerMove = direction => {
    this.autoMoveTest();
    axios
      .post(
        `https://lambda-treasure-hunt.herokuapp.com/api/adv/move/`,
        direction
      )
      .then(res => {
        this.setState({ room: res.data, cooldown: res.data.cooldown });
        this.counter = this.state.cooldown;
        if (!(res.data.room_id in JSON.parse(localStorage.getItem("map")))) {
          this.addToLocalStorageMap({
            [res.data.room_id]: {
              coordinates: res.data.coordinates,
              exits: this.generateExitsObject(res.data.exits)
            }
          });
        }
      });
  };

  render() {
    return (
      <div className="App">
        <button onClick={() => this.playerMove({ direction: "n" })}>n</button>
        <button onClick={() => this.playerMove({ direction: "s" })}>s</button>
        <button onClick={() => this.playerMove({ direction: "e" })}>e</button>
        <button onClick={() => this.playerMove({ direction: "w" })}>w</button>
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
