import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Username from './Username';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import LoginLogout from './LoginLogout';
import CreateRecipe from './CreateRecipe';
import SingleRecipe from './SingleRecipe';
import EditRecipe from './EditRecipe';
import './App.css';

class App extends Component {
  render() {
    let loginOrDashboard = this.props.auth ? (
      <Link to="/dashboard">Dashboard</Link>
    ) : (
      <Link to="/signin">Login</Link>
    );
    let signUpOrCreate = this.props.auth ? (
      <Link to="/create">Create Recipe</Link>
    ) : (
      <Link to="/signup">Sign Up</Link>
    );
    let login = this.props.auth ? <LoginLogout /> : null;

    return (
      <Router>
        <div className="App">
          <nav>
            {loginOrDashboard}
            {signUpOrCreate}
            {login}
          </nav>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
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
  auth: window.localStorage.nomnom_token
});

export default connect(mapStateToProps)(App);
