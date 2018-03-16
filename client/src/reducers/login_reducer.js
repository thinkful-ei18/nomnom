import {
  POST_LOGIN_ERROR,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_REQUEST
} from '../actions/login_actions';

const intialState = {
  jwt: window.localStorage.nomnom_token,
  loading: false,
  error: null
};

const login = (state = intialState, action) => {
  switch (action.type) {
    case POST_LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case POST_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        jwt: action.jwt.authToken
      };
    case POST_LOGIN_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default login;
