import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loginRequest } from '../../modules/auth';

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      console.log(this.props);
      if (!this.props.authenticated) {
        this.props.history.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}
