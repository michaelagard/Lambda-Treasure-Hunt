import React, { Component } from "react";

import Controls from "../components/Controls/Controls";
import Infobar from "../components/Infobar/Infobar";
import Map from "../components/Map/Map";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Controls />
        <Infobar />
        <Map />
      </div>
    );
  }
}

export default App;
