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
  render() {
    return (
      <AppWrapper>
        <TopWrapper>
          <Map />
          <Sidebar />
        </TopWrapper>
        <BottomWrapper>
          <Console />
          <Controls />
        </BottomWrapper>
      </AppWrapper>
    );
  }
}

export default App;
