import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Username from './Username';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import LoginLogout from './LoginLogout';
import CreateRecipe from './CreateRecipe';
import SingleRecipe from './SingleRecipe';
import EditRecipe from './EditRecipe';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <nav>
            <Link to="/signin">SignUp/SignIn</Link>
            <Link to="/dashboard">Dashboard</Link>
            <LoginLogout />
          </nav>
          <Route path="/signin" component={SignIn} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/create" component={CreateRecipe} />
          <Route exact path="/profile/:username" component={Username} />
          <Route exact path="/recipe/edit/:id" component={EditRecipe} />
          <Route exact path="/recipe/:id" component={SingleRecipe} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.login.jwt
});

export default connect(mapStateToProps)(App);
