import React, { Component } from 'react';
import TodoLogicLocal from './todologiclocal';
import TodoLogicUser from './todologicuser';

class UserStatus extends Component {
  constructor(props) {
    super(props);
    this.logic = new TodoLogicLocal(); //Default Logic
    if (this.checkUser()) {
      this.logic = new TodoLogicUser();
    }
  }
  /**
   * Custom interface to check user
   * @return boolean
   */
  checkUser() {
    return Meteor.userId() ? true : false;
  }

  /**
   * [getUserName description]
   * @return {string} [username of logged user]
   */
  getUserName() {
    if (!Meteor.user()) return;
    const { username } = Meteor.user();
    return username;
  }
}

export default UserStatus;
