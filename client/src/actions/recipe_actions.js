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
      .then()
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

export const postRecipe = (recipe, auth) => {
  return dispatch => {
    dispatch(postRecipeRequest());
    fetch(`${API_BASE_URL}/recipes`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth}`,
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

/* ========== Delete Recipe ========== */

export const DELETE_RECIPE_REQUEST = 'DELETE_RECIPE_REQUEST';
export const deleteRecipeRequest = () => ({
  type: DELETE_RECIPE_REQUEST
});

export const DELETE_RECIPE_SUCCESS = 'DELETE_RECIPE_SUCCESS';
export const deleteRecipeSuccess = id => ({
  type: DELETE_RECIPE_SUCCESS,
  id
});

export const DELETE_RECIPE_ERROR = 'DELETE_RECIPE_ERROR';
export const deleteRecipeError = error => ({
  type: DELETE_RECIPE_ERROR,
  error
});

export const deleteRecipe = (id, auth) => {
  return dispatch => {
    dispatch(deleteRecipeRequest());
    fetch(`${API_BASE_URL}/recipes/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${auth}`
      }
    })
      .then(res => res.statusText)
      .then(() => {
        dispatch(deleteRecipeSuccess(id));
      })
      .catch(err => {
        dispatch(deleteRecipeError(err));
      });
  };
};
