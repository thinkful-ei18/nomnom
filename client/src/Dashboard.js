import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { jwtFetch } from './actions/login_actions';
import DeleteButton from './DeleteButton';
import './Dashboard.css';

export class Dashboard extends React.Component {
  componentDidMount() {
    if (this.props.jwt && this.props.recipes.length < 1) {
      this.props.dispatch(jwtFetch(this.props.jwt));
    }
  }
  render() {
    if (!this.props.jwt) {
      this.props.history.push('/');
    }

    let displayRecipes = this.props.recipes.map(recipe => (
      <div className="recipe" key={recipe.id}>
        <span className="recipe-title">{recipe.title}</span>
        <img src={recipe.image} alt="apple pie" width="200" />
        <span>Prep time: {recipe.prepTime} </span>
        <span>Cook time: {recipe.cookTime} </span>
        <span>Ingredients</span>
        <p>
          {recipe.ingredients.map((ingredient, i) => (
            <span key={i} className="ingredient">
              {ingredient} <br />
            </span>
          ))}
        </p>
        <span>Ingredients</span>
        <p>
          {recipe.directions.map((direction, i) => (
            <span key={i} className="ingredient">
              {direction} <br />
            </span>
          ))}
        </p>
        <Link to={`/recipe/${recipe.id}`}>Direct Link</Link>
        <DeleteButton id={recipe.id} />
      </div>
    ));

    return (
      <main>
        <Link to="/create">Create Recipe</Link>
        {displayRecipes}
      </main>
    );
  }
}

const mapStateToProps = state => ({
  jwt: window.localStorage.nomnom_token,
  recipes: state.recipes.recipes
});

Dashboard = withRouter(Dashboard);

export default connect(mapStateToProps)(Dashboard);
