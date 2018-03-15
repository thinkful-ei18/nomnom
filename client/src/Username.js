import React from 'react';
import { connect } from 'react-redux';

import { fetchProfile } from './actions/profile_actions';
import './Username.css';

export class Profile extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProfile(this.props.match.params.username));
  }
  render() {
    return (
      <main>
        <h1>{this.props.match.params.username}</h1>
      </main>
    );
  }
}
const mapStateToProps = state => ({
  jwt: window.localStorage.nomnom_token,
  recipes: state.profile.recipes
});

export default connect(mapStateToProps)(Profile);
