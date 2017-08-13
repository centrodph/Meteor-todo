export default class TodoLogicLocal {
  remove(_id) {
    const mytodos = this.props.mytodos.filter(todo => todo._id != _id);
    this.setState({
      mytodos: mytodos
    });
    localStorage.setItem('todos', JSON.stringify(mytodos));
    this.props.mytodos = mytodos;
    this.props.history.push(`/todo/delete/${_id}`);
  }
  update(_id, name, description) {
    const list = JSON.parse(localStorage.getItem('todos')) || [];
    let updatedList = list.map(todo => {
      if (todo._id == _id)
        return {
          _id,
          name,
          description,
          createdAt: todo.createdAt,
          updatedAt: new Date()
        };

      return todo;
    });
    localStorage.setItem('todos', JSON.stringify(updatedList));
    this.props.history.push('/');
  }
  create(name) {
    const todoId = new Date().getTime();
    if (!Array.isArray(this.props.mytodos)) {
      this.props.mytodos = [];
    }
    this.props.mytodos.push({
      _id: todoId,
      name,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    this.setState({
      mytodos: this.props.mytodos
    });
    localStorage.setItem('todos', JSON.stringify(this.props.mytodos));
    this.props.history.push(`/todo/${todoId}`);
  }
}
