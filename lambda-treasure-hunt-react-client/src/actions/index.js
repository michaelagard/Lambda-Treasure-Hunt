import axios from "axios";

axios.defaults.headers.common["Authorization"] = `Token ${
  process.env.REACT_APP_AUTH_TOKEN
}`;

export const FETCHING_STATUS = "FETCHING_STATUS";
export const FETCHED_STATUS = "FETCHED_STATUS";
export const FETCH_STATUS_ERROR = "FETCH_STATUS_ERROR";

export const INITIALIZING = "INITIALIZING";
export const INITIALIZED = "INITIALIZED";
export const INITIALIZED_ERROR = "INITIALIZED_ERROR";

export const MOVING_PLAYER = "MOVING_PLAYER";
export const MOVED_PLAYER = "MOVED_PLAYER";
export const MOVE_PLAYER_ERROR = "MOVE_PLAYER_ERROR";

export const checkStatus = () => {
  return dispatch => {
    dispatch({ type: FETCHING_STATUS });
    axios
      .post("https://lambda-treasure-hunt.herokuapp.com/api/adv/status/")

      .then(response => {
        dispatch({ type: FETCHED_STATUS, payload: response.data });
      })

      .catch(error => dispatch({ type: FETCH_STATUS_ERROR, error: error }));
  };
};

export const playerInitialization = () => {
  return dispatch => {
    dispatch({ type: INITIALIZING });
    axios
      .get("https://lambda-treasure-hunt.herokuapp.com/api/adv/init/")

      .then(response => {
        dispatch({ type: INITIALIZED, payload: response.data });
      })

      .catch(error => dispatch({ type: INITIALIZED_ERROR, error: error }));
  };
};

export const playerMove = direction => {
  return dispatch => {
    dispatch({ type: MOVING_PLAYER });
    axios
      .post(
        `https://lambda-treasure-hunt.herokuapp.com/api/adv/move/`,
        direction
      )

      .then(response => {
        dispatch({ type: MOVED_PLAYER, payload: response.data });
      })

      .catch(error => dispatch({ type: MOVE_PLAYER_ERROR, error: error }));
  };
};
