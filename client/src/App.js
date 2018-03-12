import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRecipe } from './actions/recipe_actions';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchRecipe());
  }

  render() {
    console.log(this.props);
    return <div className="App">somestuff</div>;
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes.recipes,
  loading: state.recipes.loading,
  error: state.recipes.error
});

export default connect(mapStateToProps)(App);
