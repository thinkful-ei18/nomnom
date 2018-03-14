import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import CreateRecipe from './CreateRecipe';
import './Dashboard.css';

export function Dashboard(props) {
  if (!props.jwt) {
    props.history.push('/');
  }
  return <Link to="/create">Create Recipe</Link>;
}

const mapStateToProps = state => ({
  jwt: state.login.jwt
});

Dashboard = withRouter(Dashboard);

export default connect(mapStateToProps)(Dashboard);
