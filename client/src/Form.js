import React from 'react';
import './Form.css';
import { Field, reduxForm } from 'redux-form';
// import { required, notEmpty, requiredLength, isNumber } from './validators';
// import Input from './input';

export class Form extends React.Component {
  state = {
    ok: null,
    failure: true
  };

  onSubmit(values) {
    console.log(values);
    // return fetch(
    //   'https://us-central1-delivery-form-api.cloudfunctions.net/api/report',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/JSON'
    //     },
    //     body: JSON.stringify(values)
    //   }
    // )
    //   .then(res => {
    //     console.log(res);
    //     this.setState({ ok: res.ok, failure: res.ok });
    //   })
    //   .catch(err => console.log(err));
  }

  render() {
    let succeed = this.state.ok ? (
      <div>
        <h1>Success!</h1>
      </div>
    ) : null;
    let failure = !this.state.failure ? (
      <div>
        {' '}
        <h1>Delivery not found!</h1>{' '}
      </div>
    ) : null;
    return (
      <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <h2>Create a new recipe</h2>
        <label>Recipe name</label>
        <Field component="input" type="text" name="title" />
        <label>Image URL</label>
        <Field component="input" type="text" name="img" />
        <label>Ingredients</label>
        <span>Seperate ingredients with newline (shift + enter)</span>
        <Field component="textarea" rows="4" cols="50" name="ingredients" />
        <label>Directions</label>
        <span>Seperate directions with newline (shift + enter)</span>
        <Field component="textarea" rows="4" cols="50" name="directions" />
        <label>Prep time</label>
        <Field component="input" type="number" name="prep" />
        <label>Cook time</label>
        <Field component="input" type="number" name="cook" />
        <input type="submit" />
        {succeed}
        {failure}
      </form>
    );
  }
}

export default reduxForm({
  form: 'deliveryForm'
})(Form);
