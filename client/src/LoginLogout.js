import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { userLogout } from './actions/user_actions';
import './LoginLogout.css';

export class LoginLogout extends React.Component {
  render() {
    return (
      <button
        onClick={() => {
          this.props.dispatch(userLogout());
          this.props.history.push('/');
        }}
      >
        Logout
      </button>
    );
  }
}

LoginLogout = withRouter(LoginLogout);
export default connect()(LoginLogout);
