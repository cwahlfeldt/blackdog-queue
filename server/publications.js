Meteor.publish('queuers', function() {
    return Queuers.find();
});
