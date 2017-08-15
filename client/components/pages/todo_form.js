import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { TodoCollection } from '../../../imports/collections/todo';
import TodoLogicLocal from '../business/todologiclocal';
import TodoLogicUser from '../business/todologicuser';
import UserStatus from '../business/userstatus';

class TodoForm extends UserStatus {
  constructor(props) {
    super(props);
    this.state = { ready: false };
    this.logic = new TodoLogicLocal(); //Default Logic
    if (this.checkUser()) {
      this.logic = new TodoLogicUser();
    }
  }

  submitHandler(event) {
    event.preventDefault();
    const _id = this.props.match.params.todoId;
    const { name, description } = this.refs;
    this.logic.update(_id, name.value, description.value);
    this.props.history.push(`/?${_id}`);
  }

  render() {
    if (this.props.loading) return null;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="create-team">
              <h3>Edit Todo</h3>
              <form onSubmit={this.submitHandler.bind(this)}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    className="form-control"
                    type="text"
                    ref="name"
                    placeholder="Name"
                    defaultValue={this.props.mytodo.name}
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    className="materialize-textarea"
                    ref="description"
                    placeholder="Description"
                    defaultValue={this.props.mytodo.description}
                  />
                </div>
                <div className="form-input login-input-submit">
                  <button className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default createContainer(props => {
  const { todoId } = props.match.params;
  if (!Meteor.userId()) {
    let list = JSON.parse(localStorage.getItem('todos'));
    if (!Array.isArray(list)) {
      localStorage.setItem('todos', JSON.stringify([]));
      list = [];
    }
    return {
      mytodo: list.find(todo => todo._id == todoId)
    };
  }
  const todosHandle = Meteor.subscribe('mytodo', todoId);
  const loading = !todosHandle.ready();
  return {
    loading,
    mytodo: TodoCollection.findOne(todoId)
  };
}, TodoForm);
