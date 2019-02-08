import {
  FETCHING_STATUS,
  FETCHED_STATUS,
  FETCH_STATUS_ERROR,
  INITIALIZING,
  INITIALIZED,
  INITIALIZED_ERROR,
  MOVING_PLAYER,
  MOVED_PLAYER,
  MOVE_PLAYER_ERROR
} from "../actions";

// const initialState = {};
const initialState = {
  status: {
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
  },
  room: {
    cooldown: 0,
    coordinates: "",
    description: "",
    elevation: 0,
    errors: [],
    exits: [],
    items: [],
    messages: [],
    players: [],
    room_id: 0,
    terrain: "",
    title: ""
  }
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_STATUS:
      return { ...state, fetching_status: true };

    case FETCHED_STATUS:
      return {
        ...state,
        status: action.payload,
        fetching_status: false
      };

    case FETCH_STATUS_ERROR:
      return {
        ...state,
        fetching_status: false,
        fetch_status_error: `${action.payload}`
      };

    case INITIALIZING:
      return { ...state, fetching_init: true };

    case INITIALIZED:
      return {
        ...state,
        room: action.payload,
        fetching_init: false
      };

    case INITIALIZED_ERROR:
      return {
        ...state,
        fetching_init: false,
        fetch_init_error: `${action.payload}`
      };

    case MOVING_PLAYER:
      return { ...state, moving_player: true };

    case MOVED_PLAYER:
      return {
        ...state,
        room: action.payload,
        moving_player: false
      };

    case MOVE_PLAYER_ERROR:
      return {
        ...state,
        moving_player: false,
        move_player_error: `${action.payload}`
      };

    default:
      return state;
  }
};

export default rootReducer;
