import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { postRecipe } from './actions/recipe_actions';
import './CreateRecipe.css';
// import { required, notEmpty, requiredLength, isNumber } from './validators';
// import Input from './input';

export class CreateRecipe extends React.Component {
  createRecipe(values) {
    let obj = {
      title: values.title,
      image: values.image,
      ingredients: values.ingredients.split('\n').filter(val => val !== ''),
      directions: values.directions.split('\n').filter(val => val !== ''),
      prepTime: parseInt(values.prep, 10),
      cookTime: parseInt(values.cook, 10)
    };
    this.props.dispatch(postRecipe(obj, this.props.jwt));
  }
  redirectDashboard() {
    this.props.history.push('/dashboard');
  }

  render() {
    if (!this.props.jwt) {
      this.props.history.push('/');
    }

    return (
      <form // onSubmit={this.props.handleSubmit(values => this.createRecipe(values))}
        onSubmit={this.props.handleSubmit(values => {
          this.createRecipe(values);
          this.props.history.push('/dashboard');
        })}
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

const mapStateToProps = state => ({
  jwt: state.login.jwt
});

CreateRecipe = connect(mapStateToProps)(CreateRecipe);

CreateRecipe = withRouter(CreateRecipe);

export default reduxForm({
  form: 'deliveryForm'
})(CreateRecipe);
