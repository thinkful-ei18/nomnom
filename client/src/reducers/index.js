import { combineReducers } from 'redux';
import recipeReducer from './recipe_reducer';
import userReducer from './user_reducer';
import loginReducer from './login_reducer';
import { reducer as formReducer } from 'redux-form';

// const rootReducer = combineReducers({
//   recipes: recipeReducer,
//   login: loginReducer,
//   form: formReducer,
//   user: userReducer
// });

export const appReducer = combineReducers({
  recipes: recipeReducer,
  login: loginReducer,
  form: formReducer,
  user: userReducer
});

export const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
