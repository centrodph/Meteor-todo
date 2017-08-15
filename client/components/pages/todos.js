import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import UserStatus from '../business/userstatus';
import { TodoCollection } from '../../../imports/collections/todo';
import TodoItem from '../parts/todo-item';
class MyTodos extends UserStatus {
  constructor(props) {
    super(props);
    this.state = { rand: 0 };
  }
  createNewTask(event) {
    event.preventDefault();
    if (!this.checkUser()) {
      const _id = this.logic.create(this.refs.name.value);
      this.props.history.push(`/todo/${_id}?created=true`);
    } else {
      this.logic.create.call(this, this.refs.name.value);
    }
  }
  getList() {
    return this.props.mytodos.map((todo, index) => {
      return (
        <TodoItem
          history={this.props.history}
          index={index}
          key={todo._id}
          todo={todo}
        />
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
                <div className="todo-top-add teal z-depth-1">
                  <div className="">
                    <input
                      ref="name"
                      placeholder="Create a New Task"
                      type="text"
                      className="validate teal"
                      minLength="5"
                      id="create-new-task"
                      required
                    />
                    <button className=" todo-top-add-button btn-floating btn-large waves-effect waves-light red right">
                      <i className="material-icons">add</i>
                    </button>
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
