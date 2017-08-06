import React, { Component } from 'react';
import UserStatus from '../business/userstatus';

class LoginForm extends UserStatus {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  componentDidMount() {
    console.log('LoginForm component mounted');
  }

  componentWillUnmount() {
    console.log('LoginForm component will unmount');
  }

  submitHandler(event) {
    event.preventDefault();
    const { email, password } = this.refs;
    Meteor.loginWithPassword(email.value, password.value, err => {
      if (err) {
        this.setState({
          error: err.reason
        });
        return;
      }
      email.value = null;
      password.value = null;
      this.props.history.push('/');
    });
  }

  render() {
    return (
      <div className="login-contener">
        <div className="login-box">
          <h3>Login</h3>
          {this.state.error}
          <form onSubmit={this.submitHandler.bind(this)}>
            <div className="form-input login-input-email">
              <label>Email</label>
              <input
                className="form-control"
                type="email"
                ref="email"
                placeholder="Email"
              />
            </div>
            <div className="form-input login-input-password">
              <label>Password</label>
              <input
                className="form-control"
                type="password"
                ref="password"
                placeholder="Password"
              />
            </div>
            <div className="form-input login-input-submit">
              <button>Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
