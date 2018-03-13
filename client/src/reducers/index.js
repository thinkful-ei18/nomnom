import { combineReducers } from 'redux';
import recipeReducer from './recipe_reducer';
import loginReducer from './login_reducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  recipes: recipeReducer,
  login: loginReducer,
  form: formReducer
});

export default rootReducer;
