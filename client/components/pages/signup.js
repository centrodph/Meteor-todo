import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidMount() {
    console.log('SignUp component mounted');
  }

  componentWillUnmount() {
    console.log('SignUp component will unmount');
  }

  submitHandler(event) {
    event.preventDefault();
    const { email, password, username } = this.refs;
    Accounts.createUser(
      {
        username: username.value,
        email: email.value,
        password: password.value
      },
      err => {
        if (err) {
          this.setState({
            error: err.reason
          });
        } else {
          this.props.history.push('/');
        }
      }
    );
    username.value = null;
    email.value = null;
    password.value = null;
  }

  render() {
    return (
      <div className="login-contener">
        <div className="login-box">
          <h3>Create Account</h3>
          {this.state.error}
          <form onSubmit={this.submitHandler.bind(this)}>
            <div className="form-input login-input-username">
              <label>Name</label>
              <input
                className="form-control"
                type="text"
                ref="username"
                placeholder="Username"
              />
            </div>
            <div className="form-input login-input-email">
              <label>Email</label>
              <input
                className="form-control"
                type="email"
                ref="email"
                placeholder="email"
              />
            </div>
            <div className="form-input login-input-password">
              <label>Password</label>
              <input
                className="form-control"
                type="password"
                ref="password"
                placeholder="password"
              />
            </div>
            <div className="form-input signup-input-submit">
              <button className="waves-effect waves-light btn">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
