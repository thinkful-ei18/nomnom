import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { postUser } from './actions/user_actions';
import './NewUser.css';

export class NewUser extends React.Component {
  login(values) {
    let obj = {
      username: values.username,
      password: values.password
    };
    this.props.dispatch(postUser(obj));
  }
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(values => this.login(values))}>
        <h2>Sign Up</h2>
        <label>Username</label>
        <Field component="input" type="text" name="username" />
        <label>Enter Password</label>
        <Field component="input" type="password" name="password" />
        <input type="submit" />
      </form>
    );
  }
}

export default reduxForm({
  form: 'user'
})(NewUser);
