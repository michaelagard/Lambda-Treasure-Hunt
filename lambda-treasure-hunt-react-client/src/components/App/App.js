import React, { Component } from "react";
import styled from "styled-components";
import Console from "../Console/Console";
import Controls from "../Controls/Controls";
import Sidebar from "../Sidebar/Sidebar";
import Map from "../Map/Map";
import { connect } from "react-redux";
import { checkStatus, playerMove } from "../../actions";
class App extends Component {
  state = {
    console: []
    // auto: "True"
  };

  componentDidMount() {
    this.props.checkStatus();
  }

  componentWillReceiveProps(np) {
    const msg = ([np.room.description],
    [`Current Coordinates: ${np.room.coordinates}`]);

    this.setState({
      console: [msg, ...this.state.console]
    });
  }

  handleControls = input => {
    if (input.match(/^(n|w|s|e)$/)) {
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
  status: state.status,
  room: state.room,
  fetching_status: state.fetching,
  fetch_status_error: state.error
});

export default connect(
  mapStateToProps,
  { checkStatus, playerMove }
)(App);
