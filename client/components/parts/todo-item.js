import React, { Component } from 'react';
import UserStatus from '../business/userstatus';
import TodoLogicLocal from '../business/todologiclocal';
import TodoLogicUser from '../business/todologicuser';

class TodoItem extends UserStatus {
  constructor(props) {
    super(props);
  }

  getItemClass() {
    return this.props.index % 2 == 0
      ? 'todo-box odd grey lighten-5 z-depth-1'
      : 'todo-box even grey lighten-4 z-depth-1';
  }
  completeTask(_id) {
    this.logic.complete(_id);
    this.props.history.push(`/todo/complete/${_id}`);
  }
  removeTask(_id) {
    this.logic.remove(_id);
    this.props.history.push(`/todo/delete/${_id}`);
  }
  updateTask(_id) {
    this.props.history.push(`/todo/${_id}`);
  }
  render() {
    const { todo } = this.props;
    return (
      <div className={this.getItemClass()}>
        <div className="row">
          <div className="col s11">
            <h3>
              <a
                href="javascript:void(0);"
                onClick={this.updateTask.bind(this, todo._id)}
              >
                {todo.name}
              </a>
            </h3>
            <p>
              {todo.description}
            </p>
            <div className="todo-actions">
              <a
                href="javascript:void(0);"
                className="remove-task"
                onClick={this.removeTask.bind(this, todo._id)}
              >
                <i className="material-icons">delete_forever</i>
              </a>
              <a
                href="javascript:void(0);"
                className="complete-task"
                onClick={this.completeTask.bind(this, todo._id)}
              >
                <i
                  className={
                    todo.complete ? 'material-icons done' : 'material-icons'
                  }
                >
                  check
                </i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default TodoItem;
