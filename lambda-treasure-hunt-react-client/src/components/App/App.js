import React, { Component } from "react";
import styled from "styled-components";
import Console from "../Console/Console";
import Controls from "../Controls/Controls";
import Sidebar from "../Sidebar/Sidebar";
import Map from "../Map/Map";

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
  height: 22%;
  justify-content: space-around;
`;

class App extends Component {
  state = {
    consoleData: "This data is coming from the consoleData state."
  };
  onClick = () => {
    this.setState({
      consoleData: `You've clicked the button!`
    });
    console.log("This Click Happened");
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
          <Controls onClick={this.onClick} />
        </BottomWrapper>
      </AppWrapper>
    );
  }
}

export default App;
