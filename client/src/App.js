import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from './Form';
import Login from './Login';
import { fetchRecipe } from './actions/recipe_actions';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchRecipe());
  }

  render() {
    return (
      <div className="App">
        <Login />
        <Form />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes.recipes,
  loading: state.recipes.loading,
  error: state.recipes.error,
  auth: state.login.jwt
});

export default connect(mapStateToProps)(App);
