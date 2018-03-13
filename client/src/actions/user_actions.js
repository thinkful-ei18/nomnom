import { API_BASE_URL } from '../config';
import { postLogin } from './login_actions';

export const POST_USER_REQUEST = 'POST_USER_REQUEST';
export const postUserRequest = () => ({
  type: POST_USER_REQUEST
});

export const POST_USER_SUCCESS = 'POST_USER_SUCCESS';
export const postUserSuccess = user => ({
  type: POST_USER_SUCCESS,
  user
});

export const POST_USER_ERROR = 'POST_USER_ERROR';
export const postUserError = error => ({
  type: POST_USER_ERROR,
  error
});

export const USER_LOGOUT = 'USER_LOGOUT';
export const userLogout = () => ({
  type: USER_LOGOUT
});

export const postUser = user => {
  return dispatch => {
    dispatch(postUserRequest());
    fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/JSON'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(res => {
        dispatch(postUserSuccess(res));
        return res;
      })
      .then(res => dispatch(postLogin(user)))
      .catch(err => dispatch(postUserError(err)));
  };
};
