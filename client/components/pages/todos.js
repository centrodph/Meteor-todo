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
    return this.props.mytodos.map(todo => {
      return (
        <div className="todo-box well" key={todo._id}>
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
              <button
                className="btn btn-sm btn-danger pull-right"
                onClick={this.removeTask.bind(this, todo._id)}
              >
                X
              </button>
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
          <h3>
            MyTodos
            <button
              className="btn btn-sm btn-success pull-right"
              onClick={this.createNewTask.bind(this)}
            >
              New Task
            </button>
          </h3>
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
