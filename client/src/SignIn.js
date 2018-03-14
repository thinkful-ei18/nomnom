import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Login from './Login';
import NewUser from './NewUser';
import './SignIn.css';

export function SignUp(props) {
  if (props.jwt) {
    props.history.push('/dashboard');
  }
  return (
    <main>
      <NewUser />
      <Login />
    </main>
  );
}

const mapStateToProps = state => ({
  jwt: state.login.jwt
});

SignUp = withRouter(SignUp);

export default connect(mapStateToProps)(SignUp);
