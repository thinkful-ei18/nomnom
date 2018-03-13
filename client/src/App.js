import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SignIn from './SignIn';
// import Dashboard from './Dashboard';
import LoginLogout from './LoginLogout';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <nav>
            <Link to="/signin">SignUp/SignIn</Link>
            <LoginLogout />
          </nav>
          <Route
            exact
            path="/signin"
            jwt={this.props.auth}
            component={SignIn}
          />
          {/* <Dashboard /> */}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.login.jwt
});

export default connect(mapStateToProps)(App);
