import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import UserStatus from '../business/userstatus';

class Header extends UserStatus {
  constructor(props) {
    super(props);
    this.open = false;
  }
  componentDidMount() {
    $('.button-collapse').sideNav({ edge: 'left' }); //Event to open sidebar
  }
  chageState() {
    this.open = !this.open;
  }

  toList() {
    this.props.history.push('/');
    this.chageState();
  }
  toLogout() {
    Meteor.logout();
    window.location.reload();
  }
  toSignup() {
    this.props.history.push('/signup');
    this.chageState();
  }
  toSignin() {
    this.props.history.push('/signin');
    this.chageState();
  }

  getLinksLogged() {
    return (
      <div>
        <li>
          <a href="javascript:void(0);" onClick={this.toLogout.bind(this)}>
            Logout
          </a>
        </li>
      </div>
    );
  }
  getLinks() {
    if (this.checkUser()) return this.getLinksLogged();
    return (
      <div>
        <li>
          <a href="javascript:void(0);" onClick={this.toSignin.bind(this)}>
            Login
          </a>
        </li>
        <li>
          <a href="javascript:void(0);" onClick={this.toSignup.bind(this)}>
            SignUp
          </a>
        </li>
      </div>
    );
  }

  render() {
    return (
      <nav className="nav-extended">
        <div className="nav-wrapper">
          <div className="container">
            <a
              href="javascript:void(0);"
              onClick={this.toList.bind(this)}
              className="brand-logo"
            >
              MyTodoList
            </a>
            <a
              href="javascript:void(0);"
              data-activates="mobile-demo"
              className="button-collapse"
            >
              <i className="material-icons">menu</i>
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {this.getLinks()}
            </ul>
            <ul className="side-nav" id="mobile-demo">
              {this.getLinks()}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default createContainer(props => {
  return { myuser: Meteor.users.find({}).fetch() };
}, Header);
