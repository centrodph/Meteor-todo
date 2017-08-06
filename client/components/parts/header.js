import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import UserStatus from '../business/userstatus';

class Header extends UserStatus {
  constructor(props) {
    super(props);
  }
  toList() {
    this.props.history.push('/');
  }
  toLogout() {
    Meteor.logout();
  }
  toSignup() {
    this.props.history.push('/signup');
  }
  toSignin() {
    this.props.history.push('/signin');
  }

  getLinksLogged() {
    return (
      <ul className="nav navbar-nav pull-right">
        <li>
          <a href="#" onClick={this.toLogout.bind(this)}>
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
          <a href="#" onClick={this.toSignin.bind(this)}>
            Login
          </a>
        </li>
        <li>
          <a href="#" onClick={this.toSignup.bind(this)}>
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
