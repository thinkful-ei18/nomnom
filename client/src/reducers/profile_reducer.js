import {
  FETCH_PROFILE_ERROR,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS
} from '../actions/profile_actions';

const intialState = {
  recipes: [],
  loading: false,
  error: null
};

const profile = (state = intialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        recipes: action.recipes
      };
    case FETCH_PROFILE_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default profile;
