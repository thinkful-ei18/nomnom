import { API_BASE_URL } from '../config';

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
