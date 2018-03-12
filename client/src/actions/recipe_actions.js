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

export const fetchRecipe = () => {
  return dispatch => {
    dispatch(fetchRecipeRequest());
    fetch(`${API_BASE_URL}/recipes`)
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
