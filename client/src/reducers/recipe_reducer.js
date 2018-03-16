import {
  FETCH_RECIPE_ERROR,
  FETCH_RECIPE_REQUEST,
  FETCH_RECIPE_SUCCESS,
  POST_RECIPE_ERROR,
  POST_RECIPE_SUCCESS,
  POST_RECIPE_REQUEST,
  DELETE_RECIPE_ERROR,
  DELETE_RECIPE_SUCCESS,
  DELETE_RECIPE_REQUEST,
  PUT_RECIPE_ERROR,
  PUT_RECIPE_SUCCESS,
  PUT_RECIPE_REQUEST
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
    case PUT_RECIPE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case PUT_RECIPE_SUCCESS:
      return {
        ...state,
        recipes: state.recipes.map(
          recipe => (recipe.id === action.recipe.id ? action.recipe : recipe)
        ),
        loading: false
      };
    case PUT_RECIPE_ERROR:
      return {
        ...state,
        error: action.error
      };
    case DELETE_RECIPE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case DELETE_RECIPE_SUCCESS:
      return {
        ...state,
        recipes: state.recipes.filter(recipe => recipe.id !== action.id),
        loading: false
      };
    case DELETE_RECIPE_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default recipe;
