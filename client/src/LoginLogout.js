import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { userLogout } from './actions/user_actions';
import './LoginLogout.css';

export function LoginLogout(props) {
  return (
    <button
      onClick={() => {
        props.dispatch(userLogout());
        props.history.push('/');
      }}
    >
      Logout
    </button>
  );
}

LoginLogout = withRouter(LoginLogout);
export default connect()(LoginLogout);
