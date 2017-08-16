import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

Meteor.methods({
  'todocollection.create': function(name, description) {
    check(this.userId, String);
    return TodoCollection.insert({
      name,
      description,
      complete: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      owner: this.userId
    });
  },
  'todocollection.complete': function(todoId, status) {
    check(this.userId, String);
    return TodoCollection.update(
      {
        _id: { $eq: todoId },
        owner: { $eq: this.userId }
      },
      {
        $set: {
          complete: status,
          updatedAt: new Date()
        }
      }
    );
  },
  'todocollection.update': function(todoId, name, description) {
    check(this.userId, String);
    return TodoCollection.update(
      {
        _id: { $eq: todoId },
        owner: { $eq: this.userId }
      },
      {
        $set: {
          name,
          description,
          updatedAt: new Date()
        }
      }
    );
  },
  'todocollection.remove': function(todoId) {
    check(this.userId, String);
    return TodoCollection.remove({
      _id: { $eq: todoId },
      owner: { $eq: this.userId }
    });
  }
});

export const TodoCollection = new Mongo.Collection('todocollection');
