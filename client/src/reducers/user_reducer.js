import {
  POST_USER_ERROR,
  POST_USER_SUCCESS,
  POST_USER_REQUEST
} from '../actions/user_actions';

const intialState = {
  info: null,
  loading: false,
  error: null
};

const user = (state = intialState, action) => {
  switch (action.type) {
    case POST_USER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case POST_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        info: action.user
      };
    case POST_USER_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default user;
