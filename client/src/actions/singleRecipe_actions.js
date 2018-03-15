import { API_BASE_URL } from '../config';

/* ========== GET Recipes ========== */

export const RECIPE_REQUEST = 'RECIPE_REQUEST';
export const recipeRequest = () => ({
  type: RECIPE_REQUEST
});

export const RECIPE_SUCCESS = 'RECIPE_SUCCESS';
export const recipeSuccess = recipe => ({
  type: RECIPE_SUCCESS,
  recipe
});

export const RECIPE_ERROR = 'RECIPE_ERROR';
export const recipeError = error => ({
  type: RECIPE_ERROR,
  error
});

export const fetchSingleRecipe = (auth, id) => {
  return dispatch => {
    dispatch(recipeRequest());
    fetch(`${API_BASE_URL}/recipes/${id}`, {
      headers: {
        Authorization: `Bearer ${auth}`
      }
    })
      .then(res => res.json())
      .then(recipes => dispatch(recipeSuccess(recipes)))
      .then()
      .catch(err => dispatch(recipeError(err)));
  };
};
