import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import Login from './Login';
import './SignIn.css';

export class SignIn extends React.Component {
  render() {
    if (this.props.jwt) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <main>
        <Login />
      </main>
    );
  }
}

const mapStateToProps = state => ({
  jwt: window.localStorage.nomnom_token
});

SignIn = withRouter(SignIn);

export default connect(mapStateToProps)(SignIn);
