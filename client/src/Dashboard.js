import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import './Dashboard.css';

// {
//         "ingredients": [
//             "1",
//             "2",
//             "3"
//         ],
//         "directions": [
//             "1",
//             "2",
//             "3"
//         ],
//         "created": "2018-03-13T15:57:18.244Z",
//         "title": "State Pie",
//         "image": "image",
//         "prepTime": 10,
//         "cookTime": 10,
//         "userId": "5aa6e688cd21907472a1502f",
//         "id": "5aa7f4deba550a83c29c37b4"
//     }

export function Dashboard(props) {
  if (!props.jwt) {
    props.history.push('/');
  }
  let displayRecipes = props.recipes.map(recipe => (
    <div className="recipe" key={recipe.id}>
      <span className="recipe-title">{recipe.title}</span>
      <span>{recipe.image}</span>
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
    </div>
  ));
  return (
    <main>
      <Link to="/create">Create Recipe</Link>
      {displayRecipes}
    </main>
  );
}

const mapStateToProps = state => ({
  jwt: state.login.jwt,
  recipes: state.recipes.recipes
});

Dashboard = withRouter(Dashboard);

export default connect(mapStateToProps)(Dashboard);
