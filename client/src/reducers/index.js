import { combineReducers } from 'redux';
import recipeReducer from './recipe_reducer';
import userReducer from './user_reducer';
import loginReducer from './login_reducer';
import profileReducer from './profile_reducer';
import singleRecipeReducer from './singleRecipe_reducer';
import { reducer as formReducer } from 'redux-form';

export const appReducer = combineReducers({
  recipes: recipeReducer,
  login: loginReducer,
  form: formReducer,
  user: userReducer,
  profile: profileReducer,
  singleRecipe: singleRecipeReducer
});

export const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
    localStorage.removeItem('nomnom_token');
  }

  return appReducer(state, action);
};

export default rootReducer;
