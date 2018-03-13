import React from 'react';
import { connect } from 'react-redux';
import { userLogout } from './actions/user_actions';
import './LoginLogout.css';

export function LoginLogout(props) {
  return <button onClick={() => props.dispatch(userLogout())}>Logout</button>;
}

export default connect()(LoginLogout);
