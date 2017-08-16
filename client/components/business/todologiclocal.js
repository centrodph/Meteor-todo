/**
 * Manage the behaviour to save and recover todo from localStorage
 * 'this' represent the instance of object that called to the method
 */
export default class TodoLogicLocal {
  /**
   * Access to local storage to get the TodoList
   * @method getListTodo
   * @return {JSON Object}    List of Todo
   */
  getListTodo() {
    return JSON.parse(localStorage.getItem('todos')) || [];
  }
  /**
   * Access to local storage to set the TodoList
   * @method setListTodo
   * @param  {[type]}    mytodos [description]
   */
  setListTodo(mytodos) {
    return localStorage.setItem('todos', JSON.stringify(mytodos));
  }
  /**
   * Remove Todo Per TodoId
   * @method remove
   * @param  {[type]} _id [TodoId]
   */
  remove(_id) {
    const mytodos = this.logic.getListTodo().filter(todo => todo._id != _id);
    this.logic.setListTodo(mytodos);
    this.props.history.push(`/todo/delete/${_id}`);
  }
  /**
   * Set the complete status
   * @method complete
   * @param  {[type]} _id   [TodoId]
   * @param  {[type]} value [Status true=>complete false=>Pending]
   */
  complete(_id, status) {
    let updatedList = this.logic.getListTodo().map(todo => {
      if (todo._id == _id) todo.complete = status;
      return todo;
    });
    this.logic.setListTodo(updatedList);
    this.props.history.push(`/todo/complete/${_id}`);
  }

  update(_id, name, description) {
    let updatedList = this.logic.getListTodo().map(todo => {
      if (todo._id == _id) {
        todo.name = name;
        todo.description = description;
        todo.updatedAt = new Date();
      }
      return todo;
    });
    this.logic.setListTodo(updatedList);
    this.props.history.push(`/?${_id}`);
  }
  create(name) {
    const _id = new Date().getTime();
    let mytodos = this.logic.getListTodo();
    mytodos.push({
      _id,
      name,
      complete: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    this.logic.setListTodo(mytodos);
    this.props.history.push(`/todo/${_id}?created=true`);
  }
}
