import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import { putRecipe } from './actions/recipe_actions';
import { jwtFetch } from './actions/login_actions';
import './CreateRecipe.css';

export class CreateRecipe extends React.Component {
  componentDidMount() {
    if (this.props.jwt && this.props.recipes.length < 1) {
      this.props.dispatch(jwtFetch(this.props.jwt));
    }
  }

  createRecipe(values) {
    let obj = {
      title: values.title,
      image: values.image,
      ingredients: values.ingredients.split('\n').filter(val => val !== ''),
      directions: values.directions.split('\n').filter(val => val !== ''),
      prepTime: parseInt(values.prepTime, 10),
      cookTime: parseInt(values.cookTime, 10)
    };
    this.props.dispatch(putRecipe(this.props.id, obj, this.props.jwt));
  }
  redirectDashboard() {
    this.props.history.push('/dashboard');
  }

  render() {
    if (!this.props.jwt) {
      return <Redirect to="/signin" />;
    }
    return (
      <form
        onSubmit={this.props.handleSubmit(values => {
          this.createRecipe(values);
          this.props.history.push('/dashboard');
        })}
      >
        <h2>Edit Recipe</h2>
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
        <Field component="input" type="number" name="prepTime" />
        <label>Cook time</label>
        <Field component="input" type="number" name="cookTime" />
        <input type="submit" />
      </form>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.recipes.recipes[0]);
  return {
    jwt: window.localStorage.nomnom_token,
    recipes: state.recipes.recipes,
    id: state.editing.recipeID,
    initialValues: state.recipes.recipes.find(
      recipe => recipe.id === state.editing.recipeID
    )
  };
};

CreateRecipe = reduxForm({
  form: 'initializeFromState'
})(CreateRecipe);

CreateRecipe = withRouter(connect(mapStateToProps)(CreateRecipe));

export default CreateRecipe;
