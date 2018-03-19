import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import NewUser from './NewUser';
import './SignUp.css';

export class SignUp extends React.Component {
  render() {
    if (this.props.jwt) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <main>
        <NewUser />
      </main>
    );
  }
}

const mapStateToProps = state => ({
  jwt: window.localStorage.nomnom_token
});

SignUp = withRouter(SignUp);

export default connect(mapStateToProps)(SignUp);
