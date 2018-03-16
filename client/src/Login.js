import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import { postLogin } from './actions/login_actions';
import './Login.css';

export class Login extends React.Component {
  login(values) {
    let obj = {
      username: values.username,
      password: values.password
    };
    this.props.dispatch(postLogin(obj));
  }

  render() {
    if (this.props.jwt) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <form onSubmit={this.props.handleSubmit(values => this.login(values))}>
        <h2>Login</h2>
        <label>Enter Username</label>
        <Field component="input" type="text" name="username" />
        <label>Enter Password</label>
        <Field component="input" type="password" name="password" />
        <input type="submit" />
      </form>
    );
  }
}
const mapStateToProps = state => ({
  jwt: window.localStorage.nomnom_token
});

Login = withRouter(Login);

Login = connect(mapStateToProps)(Login);

export default reduxForm({
  form: 'login'
})(Login);
