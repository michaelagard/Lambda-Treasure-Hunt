import React, { Component } from "react";

class Controls extends Component {
  render() {
    return (
      <div className="Controls">
        <button
          disabled={this.props.canMove === false}
          onClick={() => this.props.playerMove("n")}
        >
          n
        </button>
        <button
          disabled={this.props.canMove === false}
          onClick={() => this.props.playerMove("s")}
        >
          s
        </button>
        <button
          disabled={this.props.canMove === false}
          onClick={() => this.props.playerMove("e")}
        >
          e
        </button>
        <button
          disabled={this.props.canMove === false}
          onClick={() => this.props.playerMove("w")}
        >
          w
        </button>
        <button onClick={() => this.props.autoMovement}>
          Move To Unexplored Room
        </button>
        <button
        // onClick={() => {
        //   this.state.auto
        //     ? this.setState({ auto: false })
        //     : this.setState({ auto: true });
        // }}
        >
          Toggle Auto
        </button>
      </div>
    );
  }
}

export default Controls;
