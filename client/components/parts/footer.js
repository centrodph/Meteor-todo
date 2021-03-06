import React, { Component } from 'react';
import UserStatus from '../business/userstatus';

class Footer extends UserStatus {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="footer">
        <div className="container">
          <p className="red-text">
            My Todo List work with local storage or mongodb. <br />Local Storage
            if the user is not log in. | Mongodb persistence if the user log in.
          </p>
          <p className="text-muted">© MyTodoList</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
