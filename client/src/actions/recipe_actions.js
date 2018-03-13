import { API_BASE_URL } from '../config';

/* ========== GET Recipes ========== */

export const FETCH_RECIPE_REQUEST = 'FETCH_RECIPE_REQUEST';
export const fetchRecipeRequest = () => ({
  type: FETCH_RECIPE_REQUEST
});

export const FETCH_RECIPE_SUCCESS = 'FETCH_RECIPE_SUCCESS';
export const fetchRecipeSuccess = recipes => ({
  type: FETCH_RECIPE_SUCCESS,
  recipes
});

export const FETCH_RECIPE_ERROR = 'FETCH_RECIPE_ERROR';
export const fetchRecipeError = error => ({
  type: FETCH_RECIPE_ERROR,
  error
});

export const fetchRecipe = auth => {
  return dispatch => {
    dispatch(fetchRecipeRequest());
    fetch(`${API_BASE_URL}/recipes`, {
      headers: {
        Authorization: `Bearer ${auth}`
      }
    })
      .then(res => res.json())
      .then(recipes => dispatch(fetchRecipeSuccess(recipes)))
      .catch(err => dispatch(fetchRecipeError(err)));
  };
};

/* ========== POST Recipe ========== */

export const POST_RECIPE_REQUEST = 'POST_RECIPE_REQUEST';
export const postRecipeRequest = () => ({
  type: POST_RECIPE_REQUEST
});

export const POST_RECIPE_SUCCESS = 'POST_RECIPE_SUCCESS';
export const postRecipeSuccess = recipe => ({
  type: POST_RECIPE_SUCCESS,
  recipe
});

export const POST_RECIPE_ERROR = 'POST_RECIPE_ERROR';
export const postRecipeError = error => ({
  type: POST_RECIPE_ERROR,
  error
});

export const postRecipe = recipe => {
  return dispatch => {
    dispatch(postRecipeRequest());
    fetch(`${API_BASE_URL}/recipes`, {
      method: 'POST',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiQWxpIiwiaWQiOiI1YWE2ZTY4OGNkMjE5MDc0NzJhMTUwMmYifSwiaWF0IjoxNTIwODg4Mzk5LCJleHAiOjE1MjE0OTMxOTksInN1YiI6IkFsaSJ9.1G-2AM4DuD7yAls_qWUh3FtNzC9GcmqLS6gW_nKG_EQ',
        'Content-Type': 'application/JSON'
      },
      body: JSON.stringify(recipe)
    })
      .then(res => res.json())
      .then(res => {
        dispatch(postRecipeSuccess(res));
      })
      .catch(err => dispatch(postRecipeError(err)));
  };
};
