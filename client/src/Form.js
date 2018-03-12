import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { postRecipe } from './actions/recipe_actions';
import './Form.css';
// import { required, notEmpty, requiredLength, isNumber } from './validators';
// import Input from './input';

export class Form extends React.Component {
  state = {
    ok: null,
    failure: true
  };

  onSubmit(values) {
    let obj = {
      title: values.title,
      image: values.image,
      ingredients: values.ingredients.split('\n').filter(val => val !== ''),
      directions: values.directions.split('\n').filter(val => val !== ''),
      prepTime: parseInt(values.prep, 10),
      cookTime: parseInt(values.cook, 10)
    };
    this.props.dispatch(postRecipe(obj));

    //   title: { type: String, index: true },
    // img: { type: String },
    // ingredients: [{ type: String }],
    // instructions: [{ type: String }],
    // prepTime: { type: Number },
    // cookTime: { type: Number },
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
    return (
      <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <h2>Create a new recipe</h2>
        <label>Recipe name</label>
        <Field component="input" type="text" name="title" />
        <label>Image URL</label>
        <Field component="input" type="text" name="image" />
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
      </form>
    );
  }
}

export default reduxForm({
  form: 'deliveryForm'
})(Form);
