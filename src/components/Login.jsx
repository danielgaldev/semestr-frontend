import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import {auth} from '../actions';


class Login extends Component {
  
  state = {
      username: "",
      password: ""
  }

  onSubmit = e => {
      e.preventDefault();
      this.props.login(this.state.username, this.state.password);
  }
  
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to='/' />
    }
    return (
      <div className="ui container segment">
        <form className="ui form">
          <div className="field">
            {this.props.errors.length > 0 && (
              <ul>
                {this.props.errors.map(error => (
                  <li key={error.field}>{error.message}</li>
                ))}
              </ul>
            )}
            <label>Username</label>
            <input
              type="text" id="username"
              onChange={e => this.setState({username: e.target.value})} />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password" id="password"
              onChange={e => this.setState({password: e.target.value})} />
          </div>
          <button className="ui button" type="submit">Submit</button>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let errors = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
      return {field, message: state.auth.errors[field]};
    })
  }
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated
  };
}

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => {
      return dispatch(auth.login(username, password));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);