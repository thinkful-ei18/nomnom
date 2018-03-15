import { API_BASE_URL } from '../config';

/* ========== GET PROFILEs ========== */

export const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST';
export const fetchProfileRequest = () => ({
  type: FETCH_PROFILE_REQUEST
});

export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const fetchProfileSuccess = recipes => ({
  type: FETCH_PROFILE_SUCCESS,
  recipes
});

export const FETCH_PROFILE_ERROR = 'FETCH_PROFILE_ERROR';
export const fetchProfileError = error => ({
  type: FETCH_PROFILE_ERROR,
  error
});

export const fetchProfile = username => {
  return dispatch => {
    dispatch(fetchProfileRequest());
    fetch(`${API_BASE_URL}/recipes/user/${username}`)
      .then(res => res.json())
      .then(profile => dispatch(fetchProfileSuccess(profile)))
      .then()
      .catch(err => dispatch(fetchProfileError(err)));
  };
};
