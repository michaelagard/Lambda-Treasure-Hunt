import React, { Component } from "react";
import styled from "styled-components";
import Console from "../Console/Console";
import Controls from "../Controls/Controls";
import Sidebar from "../Sidebar/Sidebar";
import Map from "../Map/Map";
import { connect } from "react-redux";
import { checkStatus, playerMove, playerInitialization } from "../../actions";
class App extends Component {
  state = {
    console: []
    // auto: "True"
  };

  componentDidMount() {
    this.props.checkStatus();
    this.props.playerInitialization();
  }

  componentWillReceiveProps(np) {
    if (np.room !== this.props.room) {
      let consoleData = this.state.console;
      let msg = [
        <hr />,
        `Exits: ${np.room.exits}`,
        np.room.description,
        np.room.messages
      ];
      console.log(msg);

      for (let i = 0; i < msg.length; i++) {
        consoleData.splice(0, 0, msg[i]);
      }
      this.setState({
        console: consoleData
      });
    }
  }
  handleControls = input => {
    if (input.match(/^(n|w|s|e)$/)) {
      localStorage.setItem("test", input);
      this.props.playerMove({ direction: input });
    }
  };

  checkInventory = () => {
    this.props.checkStatus();
  };

  render() {
    return (
      <AppWrapper>
        <TopWrapper>
          <Map />
          <Sidebar status={this.props.status} room={this.props.room} />
        </TopWrapper>
        <BottomWrapper>
          <Console data={this.state.console} />
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
  height: 77%;
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
  status: state.status,
  room: state.room,
  fetching_status: state.fetching,
  fetch_status_error: state.error
});

export default connect(
  mapStateToProps,
  { checkStatus, playerMove, playerInitialization }
)(App);
