import { Meteor } from 'meteor/meteor';
import { TodoCollection } from '../imports/collections/todo';

Meteor.startup(() => {
  Meteor.publish('myprofile', function() {
    return Meteor.users.find({ _id: this.userId });
  });
  Meteor.publish('mytodo', function(_id) {
    console.log(_id);
    return TodoCollection.find({
      owner: { $eq: this.userId },
      _id: { $eq: _id }
    });
  });
  Meteor.publish('mytodos', function() {
    return TodoCollection.find({ owner: { $eq: this.userId } });
  });
});
