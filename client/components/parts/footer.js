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
          <p className="text-muted">© MyTodoList</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
