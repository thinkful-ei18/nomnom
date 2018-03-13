import React, { Component } from 'react';
import { connect } from 'react-redux';

// import Form from './Form';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import LoginLogout from './LoginLogout';
// import { fetchRecipe } from './actions/recipe_actions';
import './App.css';
import { userLogout } from './actions/user_actions';

class App extends Component {
  logoutHandler() {
    this.props.dispatch(userLogout());
    localStorage.removeItem('nomnom_token');
  }

  render() {
    return (
      <div className="App">
        <LoginLogout logout={() => this.logoutHandler()} />
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
