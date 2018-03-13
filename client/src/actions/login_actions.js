import { API_BASE_URL } from '../config';
import { fetchRecipe } from './recipe_actions';

export const POST_LOGIN_REQUEST = 'POST_LOGIN_REQUEST';
export const postLoginRequest = () => ({
  type: POST_LOGIN_REQUEST
});

export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS';
export const postLoginSuccess = jwt => ({
  type: POST_LOGIN_SUCCESS,
  jwt
});

export const POST_LOGIN_ERROR = 'POST_LOGIN_ERROR';
export const postLoginError = error => ({
  type: POST_LOGIN_ERROR,
  error
});

export const postLogin = credentials => {
  return dispatch => {
    dispatch(postLoginRequest());
    fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/JSON'
      },
      body: JSON.stringify(credentials)
    })
      .then(res => res.json())
      .then(res => {
        dispatch(postLoginSuccess(res));
        return res;
      })
      .then(res => {
        dispatch(fetchRecipe(res.authToken));
        return res.authToken;
      })
      .then(res => {
        localStorage.setItem('nomnom_token', res);
      })
      .catch(err => dispatch(postLoginError(err)));
  };
};