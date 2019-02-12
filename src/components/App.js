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
      cooldown: 0,
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
    console.log(newMap);
    localStorage.setItem("map", JSON.stringify(newMap));
  };
  counter = 6;

  autoMoveTest = () => {
    this.timerID = setInterval(() => {
      this.cooldownCountdown();
    }, 1000);
  };

  cooldownCountdown = () => {
    this.counter -= 1;
    console.log(this.counter);

    if (this.counter <= 0) {
      clearInterval(this.timerID);
      this.counter = this.cooldown;
    }
  };

  playerMove = direction => {
    this.counter -= 1;
    axios
      .post(
        `https://lambda-treasure-hunt.herokuapp.com/api/adv/move/`,
        direction
      )
      .then(res => {
        this.setState({ room: res.data });
        this.addToLocalStorageMap({
          [res.data.room_id]: {
            coordinates: res.data.coordinates,
            exits: res.data.exits
          }
        });
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
          <li>Cooldown: {this.state.room.cooldown}</li>
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
