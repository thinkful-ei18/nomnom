import React from 'react';
import { Field, reduxForm } from 'redux-form';

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

export default reduxForm({
  form: 'login'
})(Login);
