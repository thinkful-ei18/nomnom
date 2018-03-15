import React from 'react';
import { connect } from 'react-redux';
import './Dashboard.css';
import { deleteRecipe } from './actions/recipe_actions';

export function DeleteButton(props) {
  return (
    <button onClick={() => props.dispatch(deleteRecipe(props.id, props.jwt))}>
      Delete
    </button>
  );
}
const mapStateToProps = state => ({
  jwt: window.localStorage.nomnom_token
});

export default connect(mapStateToProps)(DeleteButton);
