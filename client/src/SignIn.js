import React from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import NewUser from './NewUser';
import './SignIn.css';

export function SignUp(props) {
  console.log(props.jwt);
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

export default connect(mapStateToProps)(SignUp);
