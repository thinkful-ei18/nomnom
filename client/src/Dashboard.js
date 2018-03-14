import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import CreateRecipe from './CreateRecipe';
import './Dashboard.css';

export default function Dashboard() {
  return <Link to="/create">Create Recipe</Link>;
}
