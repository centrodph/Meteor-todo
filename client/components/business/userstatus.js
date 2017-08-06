import React, { Component } from 'react';

class UserStatus extends Component {
  constructor(props) {
    super(props);
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
