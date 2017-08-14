export default class TodoLogicUser {
  remove(_id) {
    Meteor.call('todocollection.remove', _id, (error, todoId) => {
      this.props.history.push(`/todo/delete/${_id}`);
    });
  }
  complete(_id) {
    Meteor.call('todocollection.complete', _id, (error, todoId) => {
      this.props.history.push(`/`);
    });
  }
  update(_id, name, description) {
    Meteor.call(
      'todocollection.update',
      _id,
      name,
      description,
      (error, todoId) => {
        this.props.history.push(`/`);
      }
    );
  }
  create(name) {
    Meteor.call('todocollection.create', name, null, (error, todoId) => {
      this.props.history.push(`/todo/${todoId}`);
    });
  }
}
