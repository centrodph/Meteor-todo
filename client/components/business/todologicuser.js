/**
 * Manage the behaviour to save and recover todo from MongoDB
 * 'this' represent the instance of object that called to the method
 */
export default class TodoLogicUser {
  /**
   * Remove Todo Per TodoId
   * @method remove
   * @param  {[type]} _id [TodoId]
   */
  remove(_id) {
    Meteor.call('todocollection.remove', _id, (error, todoId) => {
      this.props.history.push(`/todo/delete/${_id}`);
    });
  }
  /**
   * Set the complete status
   * @method complete
   * @param  {[type]} _id   [TodoId]
   * @param  {[type]} value [Status true=>complete false=>Pending]
   */

  complete(_id, status) {
    Meteor.call('todocollection.complete', _id, status, (error, todoId) => {
      this.props.history.push(`/`);
    });
  }
  update(_id, name, description, history) {
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
    Meteor.call('todocollection.create', name, null, (error, _id) => {
      this.props.history.push(`/todo/${_id}?created=true`);
    });
  }
}
