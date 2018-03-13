import React from 'react';
import { connect } from 'react-redux';

// import { userLogout } from './actions/user_actions';
import './LoginLogout.css';

export default function LoginLogout(props) {
  return <button onClick={() => props.logout()}> </button>;
}
