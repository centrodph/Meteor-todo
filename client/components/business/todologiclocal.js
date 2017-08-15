export default class TodoLogicLocal {
  getListTodo() {
    return JSON.parse(localStorage.getItem('todos')) || [];
  }

  setListTodo(mytodos) {
    return localStorage.setItem('todos', JSON.stringify(mytodos));
  }

  remove(_id) {
    const mytodos = this.getListTodo().filter(todo => todo._id != _id);
    this.setListTodo(mytodos);
  }

  complete(_id) {
    let updatedList = this.getListTodo().map(todo => {
      if (todo._id == _id) todo.complete = true;
      return todo;
    });
    this.setListTodo(updatedList);
  }

  update(_id, name, description) {
    let updatedList = this.getListTodo().map(todo => {
      if (todo._id == _id) {
        todo.name = name;
        todo.description = description;
        todo.updatedAt = new Date();
      }
      return todo;
    });
    this.setListTodo(updatedList);
  }
  create(name) {
    const todoId = new Date().getTime();
    let mytodos = this.getListTodo();
    mytodos.push({
      _id: todoId,
      name,
      complete: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    this.setListTodo(mytodos);
    return new Promise((resolve, reject) => {
      resolve(todoId);
    });
  }
}
