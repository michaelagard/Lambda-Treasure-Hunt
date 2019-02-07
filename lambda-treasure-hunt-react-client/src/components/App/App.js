import React, { Component } from "react";
import styled from "styled-components";
import Console from "../Console/Console";
import Controls from "../Controls/Controls";
import Sidebar from "../Sidebar/Sidebar";
import Map from "../Map/Map";
import { connect } from "react-redux";
import { checkStatus, playerInitialization } from "../../actions";
class App extends Component {
  state = {
    consoleData: [],
    serverState: {},
    statusState: {
      cooldown: 0,
      encumbrance: 0,
      errors: [],
      gold: 0,
      inventory: [],
      messages: [],
      name: "",
      speed: 0,
      status: [],
      strength: 0
    }
  };

  componentDidMount() {
    this.props.playerInitialization();
  }
  componentWillReceiveProps(newProps) {
    this.setState({ statusState: newProps.statusState });
  }

  handleControls = input => {
    if (input.match(/^(u|l|d|r)$/)) {
      this.playerMove(input);
      console.log(input);
    }
  };

  playerMove = direction => {
    let msg = [`You attempt to move ${direction}.`];
    this.setState({
      consoleData: [msg, ...this.state.consoleData]
    });
  };

  checkInventory = () => {
    this.props.checkStatus();
    // console.log(`STATUS: NAME : ${this.state.statusState.name}`);
    // this.setState({
    //   statusState: this.props.statusState
    // });
  };

  render() {
    return (
      <AppWrapper>
        <TopWrapper>
          <Map />
          <Sidebar statusState={this.state.statusState} />
        </TopWrapper>
        <BottomWrapper>
          <Console data={this.state.consoleData} />
          <Controls
            checkInventory={this.checkInventory}
            handleControls={this.handleControls}
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

const mapStateToProps = state => ({
  statusState: state.statusState,
  fetching_status: state.fetching,
  fetch_status_error: state.error
});

export default connect(
  mapStateToProps,
  { checkStatus, playerInitialization }
)(App);
