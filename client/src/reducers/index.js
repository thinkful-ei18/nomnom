import { combineReducers } from 'redux';
import recipeReducer from './recipe-reducer';

const rootReducer = combineReducers({ recipes: recipeReducer });

export default rootReducer;
