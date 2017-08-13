import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import UserStatus from '../business/userstatus';
import TodoLogicLocal from '../business/todologiclocal';
import TodoLogicUser from '../business/todologicuser';
import { TodoCollection } from '../../../imports/collections/todo';

class MyTodos extends UserStatus {
  constructor(props) {
    super(props);
    this.state = {
      mytodos: this.props.mytodos
    };
    this.logic = new TodoLogicLocal(); //Default Logic
    if (this.checkUser()) {
      this.logic = new TodoLogicUser();
    }
  }
  updateTask(_id) {
    this.props.history.push(`/todo/${_id}`);
  }
  createNewTask() {
    return this.logic.create.call(this);
  }
  removeTask(_id) {
    return this.logic.remove.call(this, _id);
  }
  getList() {
    return this.props.mytodos.map((todo, index) => {
      return (
        <div
          className={
            index % 2 == 0 ? 'todo-box well odd' : 'todo-box well even'
          }
          key={todo._id}
        >
          <div className="row">
            <div className="col-xs-10">
              <h3>
                <a href="#" onClick={this.updateTask.bind(this, todo._id)}>
                  {todo.name}
                </a>
              </h3>
              <p>
                {todo.description}
              </p>
            </div>
            <div className="col-xs-2">
              <a
                className="btn-floating btn-large waves-effect waves-light red"
                onClick={this.removeTask.bind(this, todo._id)}
              >
                <i className="material-icons">add</i>
              </a>
            </div>
          </div>
        </div>
      );
    });
  }
  render() {
    return (
      <div className="container">
        <div className="todo-contener">
          <form className="col s12">
            <div className="row">
              <div className="todo-top-add light-green lighten-5 col s12">
                <div className="input-field">
                  <input
                    placeholder="Placeholder"
                    id="first_name"
                    type="text"
                    className="validate light-green lighten-5"
                  />
                  <div className="fixed-action-btn horizontal">
                    <a
                      className=" todo-top-add btn-floating btn-large waves-effect waves-light red right"
                      onClick={this.createNewTask.bind(this)}
                    >
                      <i className="material-icons">add</i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <h3 />
          <div className="todo-boxes">
            {this.getList()}
          </div>
        </div>
      </div>
    );
  }
}

export default createContainer(props => {
  if (!Meteor.userId()) {
    let list = JSON.parse(localStorage.getItem('todos'));
    if (!Array.isArray(list)) {
      localStorage.setItem('todos', JSON.stringify([]));
      list = [];
    }
    return { mytodos: list };
  }
  Meteor.subscribe('mytodos');
  return { mytodos: TodoCollection.find({}).fetch() };
}, MyTodos);
