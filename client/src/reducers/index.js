import { combineReducers } from 'redux';
import recipeReducer from './recipe-reducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  recipes: recipeReducer,
  form: formReducer
});

export default rootReducer;
