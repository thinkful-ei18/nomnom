import {
  RECIPE_ERROR,
  RECIPE_REQUEST,
  RECIPE_SUCCESS
} from '../actions/singleRecipe_actions';

const intialState = {
  recipe: {},
  loading: false,
  error: null
};

const recipe = (state = intialState, action) => {
  switch (action.type) {
    case RECIPE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case RECIPE_SUCCESS:
      return {
        ...state,
        loading: false,
        recipe: action.recipe
      };
    case RECIPE_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default recipe;
