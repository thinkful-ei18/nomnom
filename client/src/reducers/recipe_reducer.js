import {
  FETCH_RECIPE_ERROR,
  FETCH_RECIPE_REQUEST,
  FETCH_RECIPE_SUCCESS,
  POST_RECIPE_ERROR,
  POST_RECIPE_SUCCESS,
  POST_RECIPE_REQUEST
} from '../actions/recipe_actions';

const intialState = {
  recipes: [],
  loading: false,
  error: null
};

const recipe = (state = intialState, action) => {
  switch (action.type) {
    case FETCH_RECIPE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_RECIPE_SUCCESS:
      return {
        ...state,
        loading: false,
        recipes: action.recipes
      };
    case FETCH_RECIPE_ERROR:
      return {
        ...state,
        error: action.error
      };
    case POST_RECIPE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case POST_RECIPE_SUCCESS:
      return {
        ...state,
        recipes: [...state.recipes, action.recipe],
        loading: false
      };
    case POST_RECIPE_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default recipe;