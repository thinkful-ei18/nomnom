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

  createRecipe(values) {
    let obj = {
      title: values.title,
      image: values.image,
      ingredients: values.ingredients.split('\n').filter(val => val !== ''),
      directions: values.directions.split('\n').filter(val => val !== ''),
      prepTime: parseInt(values.prep, 10),
      cookTime: parseInt(values.cook, 10)
    };
    this.props.dispatch(postRecipe(obj));
  }

  render() {
    console.log(this.state);
    return (
      <form
        onSubmit={this.props.handleSubmit(values => this.createRecipe(values))}
      >
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
