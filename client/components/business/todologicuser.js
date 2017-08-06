export default class TodoLogicUser {
  remove(_id) {
    Meteor.call('todocollection.remove', _id, (error, todoId) => {
      this.props.history.push(`/todo/delete/${_id}`);
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
  create() {
    Meteor.call('todocollection.create', null, null, (error, todoId) => {
      this.props.history.push(`/todo/${todoId}`);
    });
  }
}
