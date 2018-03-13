import React, { Component } from 'react';
import { connect } from 'react-redux';

// import Form from './Form';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
// import { fetchRecipe } from './actions/recipe_actions';
import './App.css';

class App extends Component {
  // componentDidMount() {
  //   this.props.dispatch(fetchRecipe());
  // }

  render() {
    return (
      <div className="App">
        <SignIn />
        <Dashboard />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.login.jwt
});

export default connect(mapStateToProps)(App);
