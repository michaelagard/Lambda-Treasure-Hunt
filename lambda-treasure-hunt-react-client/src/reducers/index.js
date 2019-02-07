import {
  FETCHING_STATUS,
  FETCHED_STATUS,
  FETCH_STATUS_ERROR,
  FETCHING_INIT,
  FETCHED_INIT,
  FETCH_INIT_ERROR
} from "../actions";

// const initialState = {};
const initialState = {
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
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_STATUS:
      return { ...state, fetching_status: true };

    case FETCHED_STATUS:
      return {
        ...state,
        statusState: action.payload,
        fetching_status: false
      };

    case FETCH_STATUS_ERROR:
      return {
        ...state,
        fetching_status: false,
        fetch_status_error: `${action.payload}`
      };

    case FETCHING_INIT:
      return { ...state, fetching_init: true };

    case FETCHED_INIT:
      return {
        ...state,
        initState: action.payload,
        fetching_init: false
      };

    case FETCH_INIT_ERROR:
      return {
        ...state,
        fetching_init: false,
        fetch_init_error: `${action.payload}`
      };

    default:
      return state;
  }
};

export default rootReducer;
