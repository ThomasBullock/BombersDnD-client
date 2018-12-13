import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './Login.scss';
import { submitLoginRequest } from '../../modules/auth';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('login!');
    this.props.submitLoginRequest(this.state);
  }

  handleChange(event, i, value) {
    console.log(event.target, i, value);
    this.setState({
      [event.target.name]: i
    });
  }

  render() {
    return (
      <div className="login__form">
        <TextField
          name="username"
          value={this.state.username}
          hintText="Username"
          onChange={this.handleChange}
          required
        />
        <TextField
          name="password"
          value={this.state.password}
          hintText="Password"
          onChange={this.handleChange}
          required
        />
        <RaisedButton
          label="Login"
          onClick={this.handleSubmit}
          primary={true}
        />
      </div>
    );
  }
}

Login.propTypes = {};

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitLoginRequest: user => dispatch(submitLoginRequest(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
