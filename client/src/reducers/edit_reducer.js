import { CLICKED_RECIPE } from '../actions/edit_actions';

const intialState = {
  recipeID: null
};

const edit = (state = intialState, action) => {
  switch (action.type) {
    case CLICKED_RECIPE:
      return {
        ...state,
        recipeID: action.id
      };
    default:
      return state;
  }
};

export default edit;
