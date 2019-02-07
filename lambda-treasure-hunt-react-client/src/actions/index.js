import axios from "axios";

axios.defaults.headers.common["Authorization"] = `Token ${
  process.env.REACT_APP_AUTH_TOKEN
}`;

export const FETCHING_STATUS = "FETCHING_STATUS";
export const FETCHED_STATUS = "FETCHED_STATUS";
export const FETCH_STATUS_ERROR = "FETCH_STATUS_ERROR";

export const FETCHING_INIT = "FETCHING_INIT";
export const FETCHED_INIT = "FETCHED_INIT";
export const FETCH_INIT_ERROR = "FETCH_INIT_ERROR";

export const checkStatus = () => {
  return dispatch => {
    dispatch({ type: FETCHING_STATUS });
    axios
      .post("https://lambda-treasure-hunt.herokuapp.com/api/adv/status/")

      .then(response => {
        console.log(response.data);
        dispatch({ type: FETCHED_STATUS, payload: response.data });
      })

      .catch(error => dispatch({ type: FETCH_STATUS_ERROR, error: error }));
  };
};

export const playerInitialization = () => {
  return dispatch => {
    dispatch({ type: FETCHING_INIT });
    axios
      .post("https://lambda-treasure-hunt.herokuapp.com/api/adv/init/")

      .then(response => {
        console.log(response.data);
        dispatch({ type: FETCHED_INIT, payload: response.data });
      })

      .catch(error => dispatch({ type: FETCH_INIT_ERROR, error: error }));
  };
};
