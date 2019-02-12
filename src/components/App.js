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
    this.init();
  }

  playerMove = direction => {
    axios
      .post(
        `https://lambda-treasure-hunt.herokuapp.com/api/adv/move/`,
        direction
      )
      .then(res => {
        console.log(res.data);
        this.setState({ room: res.data });
      });
  };

  init = () => {
    axios
      .get(`https://lambda-treasure-hunt.herokuapp.com/api/adv/init/`)
      .then(res => {
        console.log(res.data);
        this.setState({ room: res.data });
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
        {this.state.room.coordinates}
        {this.state.room.exits}
      </div>
    );
  }
}

export default App;
