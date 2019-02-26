import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

// import {Queue, antiCompass} from "../helper/HelperFile";
import Controls from "../components/Controls/Controls";
import Infobar from "../components/Infobar/Infobar";
// import Map from "../components/Map/Map";

axios.defaults.headers.common["Authorization"] = `Token ${
  process.env.REACT_APP_AUTH_TOKEN
}`;

class App extends Component {
  state = {
    currentRoom: {},
    map: {},
    path: []
  };

  componentDidMount() {
    if (!localStorage.getItem("map")) {
      localStorage.setItem("map", JSON.stringify({}));
    } else {
      this.setState({ map: JSON.parse(localStorage.getItem("map")) });
    }
    axios
      .get(`https://lambda-treasure-hunt.herokuapp.com/api/adv/init/`)
      .then(res => {
        this.setState(
          { currentRoom: res.data, cooldown: res.data.cooldown },
          () => {
            this.startCooldown();
            this.roomCheck();
          }
        );
      })
      .catch(err => {
        this.setState({
          initError: err
        });
        // clog();
      });
  }

  roomCheck = () => {
    if (!this.state.map[this.state.currentRoom.room_id]) {
      const room_id = this.state.currentRoom.room_id;
      const coords = this.state.currentRoom.coordinates;
      const exits = this.state.currentRoom.exits;

      const localExits = {};
      const connections = [];

      exits.forEach(direction => {
        const neighborCoords = this.getNeighbor(coords, direction);
        const neighbor = this.state.map[neighborCoords];
        // console.log(`neighbor id:`, neighborCoords);

        if (neighbor) {
          localExits[direction] = neighbor.room_id;

          connections.push({
            coords: neighborCoords,
            exit: this.anticompass(direction)
          });
        } else {
          localExits[direction] = "?";
        }
      });

      this.setState({
        map: {
          ...this.state.map,
          [coords]: { room_id, exits: localExits }
        }
      });

      // console.log("connections:", connections);

      connections.forEach(connection => {
        this.setState({
          map: {
            ...this.state.map,
            [connection.coords]: {
              ...this.state.map[connection.coords],
              exits: {
                ...this.state.map[connection.coords].exits,
                [connection.exit]: room_id
              }
            }
          }
        });
      });

      localStorage.setItem("map", JSON.stringify(this.state.map));
    }

    if (this.state.auto) {
      this.makePath();
    }
  };

  // manualMovePlayer = direction => {
  //   axios
  //     .post(`https://lambda-treasure-hunt.herokuapp.com/api/adv/move/`, {
  //       direction
  //     })
  //     .then(res => {
  //       this.setState({ currentRoom: res.data });
  //       this.roomCheck();
  //     })
  //     .catch(err => {
  //       this.setState({
  //         moveError: err
  //       });
  //     });
  // };

  makePath = () => {
    const coords = this.state.currentRoom.coordinates;
    const exits = this.state.map[coords].exits;

    // const path = [];

    for (const [direction, room_id] of Object.entries(exits)) {
      if (room_id === "?") {
        // path.push({ direction });

        this.setState({ path: [{ direction }] }, () => {
          if (!this.state.cooldown) {
            this.movePlayer();
          }
        });
        return;
      }
    }

    const visited = new Set();
    const queue = [[{ coords }]];

    while (queue.length) {
      const currentPath = queue.shift();
      const currentCoords = currentPath[currentPath.length - 1].coords;
      const currentExits = this.state.map[currentCoords].exits;

      for (const [direction, room_id] of Object.entries(currentExits)) {
        const neighborCoords = this.getNeighbor(currentCoords, direction);

        if (!visited.has(neighborCoords)) {
          visited.add(neighborCoords);

          if (room_id === "?") {
            // path.concat([...currentPath.slice(1), { direction }]);

            this.setState(
              { path: [...currentPath.slice(1), { direction }] },
              () => {
                if (!this.state.cooldown) {
                  this.movePlayer();
                }
              }
            );
            return;
          }
        }
      }
    }

    // if (path.length) {
    //   if (!this.state.cooldown) {
    //     this.movePlayer();
    //   }
    // } else {
    this.setState({ auto: false });
    console.log("Dunnerooni!");
    // }

    // if (!this.state.path.length) {
    //   this.setState({ auto: false });
    //   console.log("Dunnerooni!");
    // }
  };

  movePlayer = () => {
    // console.log(`move request with ${this.state.path[0]}`);

    axios
      .post(
        `https://lambda-treasure-hunt.herokuapp.com/api/adv/move/`,
        this.state.path[0]
      )
      .then(res => {
        this.setState(
          {
            currentRoom: res.data,
            cooldown: res.data.cooldown,
            path: this.state.path.slice(1)
          },
          () => {
            this.startCooldown();
            this.roomCheck();
          }
        );
      })
      .catch(err => {
        this.setState({
          moveError: err
        });
        console.log("move error");
      });
  };

  getNeighbor = (coords, direction) => {
    let [x, y] = coords.slice(1, -1).split(",");
    // Turn the strings into numbers to prevent Bad Things from happening
    x = +x;
    y = +y;

    return {
      n: `(${x},${y++})`,
      s: `(${x},${y--})`,
      e: `(${x++},${y})`,
      w: `(${x--},${y})`
    }[direction];
  };

  anticompass = direction => {
    return { n: "s", s: "n", e: "w", w: "e" }[direction];
  };

  autoToggle = () => {
    this.setState({ auto: !this.state.auto }, () => {
      if (this.state.auto) {
        this.makePath();
      }
    });
  };

  startCooldown = () => {
    const ticker = setInterval(this.tick, 1000);

    this.setState({ ticker });
  };

  tick = () => {
    this.setState({ cooldown: this.state.cooldown - 1 });

    if (!this.state.cooldown) {
      clearInterval(this.state.ticker);

      if (this.state.auto) {
        // ERROR HANDLING HERE
        if (this.state.path.length) {
          this.movePlayer();
        } else {
          console.log("oopsy woopsy we had a buggy wuggy");
        }
      }
    }
  };

  render() {
    return (
      <AppWrapper>
        <TopWrapper>
          {/* <Map roomId={this.state.roomId} /> */}
          <Infobar
            coordinates={this.state.coordinates}
            exits={this.state.exits}
            cooldown={this.state.cooldown}
            roomId={this.state.roomId}
            players={this.state.players}
            errors={this.state.errors}
            messages={this.state.messages}
            description={this.state.description}
          />
        </TopWrapper>
        <BottomWrapper>
          <Controls
            // manualMovePlayer={this.manualMovePlayer}
            autoMovement={this.autoMovement}
            autoToggle={this.autoToggle}
            canMove={this.state.canMove}
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
  background: lightgray;
`;

const BottomWrapper = styled.div`
  display: flex;
  width: 100%;
  max-height: 20%;
  height: 20%;
  justify-content: space-around;
  background: lightgray;
`;

export default App;
