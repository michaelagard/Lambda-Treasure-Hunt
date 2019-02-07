import React, { Component } from "react";
import styled from "styled-components";
import Console from "../Console/Console";
import Controls from "../Controls/Controls";
import Sidebar from "../Sidebar/Sidebar";
import Map from "../Map/Map";

class App extends Component {
  state = {
    consoleData: []
  };

  checkInventory = () => {
    let msg = ["Inventory: "];
    this.setState({
      consoleData: [msg, ...this.state.consoleData]
    });
  };

  moveUp = () => {
    let msg = ["You attempt to move up."];
    this.setState({
      consoleData: [msg, ...this.state.consoleData]
    });
  };

  moveLeft = () => {
    let msg = ["You attempt to move left."];
    this.setState({
      consoleData: [msg, ...this.state.consoleData]
    });
  };

  moveDown = () => {
    let msg = ["You attempt to move down."];
    this.setState({
      consoleData: [msg, ...this.state.consoleData]
    });
  };

  moveRight = () => {
    let msg = ["You attempt to move right."];
    this.setState({
      consoleData: [msg, ...this.state.consoleData]
    });
  };

  render() {
    return (
      <AppWrapper>
        <TopWrapper>
          <Map />
          <Sidebar />
        </TopWrapper>
        <BottomWrapper>
          <Console data={this.state.consoleData} />
          <Controls
            checkInventory={this.checkInventory}
            moveUp={this.moveUp}
            moveLeft={this.moveLeft}
            moveDown={this.moveDown}
            moveRight={this.moveRight}
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
  height: 78%;
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

export default App;
