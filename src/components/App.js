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
    // this.init();
  }

  addToLocalStorageMap = update => {
    console.log(
      `addToLocalStorageMap(update) called with update ${update} passed.`
    );

    let oldMap = JSON.parse(localStorage.getItem("map"));
    console.log(`Old Map: ${oldMap}`);
    let newMapData = update;
    let newMap = Object.assign({}, newMapData, oldMap);
    localStorage.setItem("map", JSON.stringify(newMap));
  };

  playerMove = direction => {
    console.log(
      `playerMove(direction) called with direction ${direction} passed.`
    );
    this.timer(6);
    axios
      .post(
        `https://lambda-treasure-hunt.herokuapp.com/api/adv/move/`,
        direction
      )
      .then(res => {
        console.log("playerMove(direction) finished.");
        this.setState({ room: res.data });
        this.addToLocalStorageMap({ coordinates: res.data.room.coordinates });
      });
  };

  timer = seconds => {
    let timeleft = seconds;
    setInterval(() => {
      timeleft -= 1;
      console.log(timeleft);
      if (timeleft <= 0) {
        clearInterval(this.timer);
        return timeleft;
      }
    }, 1000);
  };

  init = () => {
    console.log("init() called.");

    axios
      .get(`https://lambda-treasure-hunt.herokuapp.com/api/adv/init/`)
      .then(res => {
        this.setState({ room: res.data });
        console.log("init() finished.");
      });
  };

  render() {
    return (
      <div className="App">
        <button onClick={() => this.playerMove({ direction: "n" })}>n</button>
        <button onClick={() => this.playerMove({ direction: "s" })}>s</button>
        <button onClick={() => this.playerMove({ direction: "e" })}>e</button>
        <button onClick={() => this.playerMove({ direction: "w" })}>w</button>
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
