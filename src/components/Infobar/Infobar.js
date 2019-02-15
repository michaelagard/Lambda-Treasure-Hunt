import React, { Component } from "react";

class Infobar extends Component {
  render() {
    return (
      <div className="Infobar">
        <ul>
          <li>Coordinates: {this.props.coordinates}</li>
          <li>Exits: {this.props.exits}</li>
          <li>Cooldown: {this.props.cooldown}</li>
          <li>Room ID: {this.props.roomId}</li>
          <li>Players: {this.props.players}</li>
          <li>Errors: {this.props.errors}</li>
          <li>Messages: {this.props.messages}</li>
          <li>Description: {this.props.description}</li>
        </ul>
      </div>
    );
  }
}

export default Infobar;
