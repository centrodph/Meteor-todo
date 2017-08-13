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
  createNewTask(event) {
    event.preventDefault();
    return this.logic.create.call(this, this.refs.name.value);
  }
  removeTask(_id) {
    return this.logic.remove.call(this, _id);
  }
  getList() {
    return this.props.mytodos.map((todo, index) => {
      return (
        <div
          className={
            index % 2 == 0
              ? 'todo-box odd teal lighten-4'
              : 'todo-box even teal lighten-3'
          }
          key={todo._id}
        >
          <div className="row">
            <div className="col s10">
              <h3>
                <a href="#" onClick={this.updateTask.bind(this, todo._id)}>
                  {todo.name}
                </a>
              </h3>
              <p>
                {todo.description}
              </p>
            </div>
            <div className="col s2">
              <a
                href="javascript:void(0);"
                className="remove-task"
                onClick={this.removeTask.bind(this, todo._id)}
              >
                <i className="material-icons">delete_forever</i>
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
          <form className="col s12" onSubmit={this.createNewTask.bind(this)}>
            <div className="row">
              <div className="col s12">
                <div className="todo-top-add green accent-2">
                  <div className="input-field">
                    <input
                      ref="name"
                      placeholder="Name"
                      type="text"
                      className="validate green accent-2"
                      minlength="5"
                      required
                    />
                    <div className="fixed-action-btn horizontal">
                      <button className=" todo-top-add btn-floating btn-large waves-effect waves-light red right">
                        <i className="material-icons">add</i>
                      </button>
                    </div>
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
