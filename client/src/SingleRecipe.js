import React from 'react';
import { connect } from 'react-redux';

import { fetchSingleRecipe } from './actions/singleRecipe_actions';
import './SingleRecipe.css';

export class SingleRecipe extends React.Component {
  componentDidMount() {
    this.props.dispatch(
      fetchSingleRecipe(this.props.jwt, this.props.match.params.id)
    );
  }
  render() {
    return (
      <main>
        <h1>{this.props.match.params.id}</h1>
      </main>
    );
  }
}
const mapStateToProps = state => ({
  jwt: window.localStorage.nomnom_token
});

export default connect(mapStateToProps)(SingleRecipe);
