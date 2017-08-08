import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import UserStatus from '../business/userstatus';

class Header extends UserStatus {
  constructor(props) {
    super(props);
    this.open = false;
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
      <ul className="nav navbar-nav pull-right">
        <li>
          <a
            href="#"
            data-toggle="collapse"
            data-target="#navbar"
            className="dropdown-toggle"
            onClick={this.toLogout.bind(this)}
          >
            Logout
          </a>
        </li>
      </ul>
    );
  }
  getLinks() {
    if (this.checkUser()) return this.getLinksLogged();
    return (
      <ul className="nav navbar-nav pull-right">
        <li>
          <a
            href="#"
            data-toggle="collapse"
            data-target="#navbar"
            className="dropdown-toggle"
            onClick={this.toSignin.bind(this)}
          >
            Login
          </a>
        </li>
        <li>
          <a
            href="#"
            data-toggle="collapse"
            data-target="#navbar"
            onClick={this.toSignup.bind(this)}
          >
            SignUp
          </a>
        </li>
      </ul>
    );
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a
              className="navbar-brand"
              data-toggle="collapse"
              data-target="#navbar"
              href="#"
              onClick={this.toList.bind(this)}
            >
              MyTodoList
            </a>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            {this.getLinks()}
          </div>
        </div>
      </nav>
    );
  }
}

export default createContainer(props => {
  return { myuser: Meteor.users.find({}).fetch() };
}, Header);
