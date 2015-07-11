Queuers = new Mongo.Collection('queuers');

Meteor.methods({
    queuerInsert: function(queuerAttr) {

        var queuer = {
            name: queuerAttr.name,
            partySize: queuerAttr.partySize,
            phoneNumber: queuerAttr.phoneNumber,
            date: new Date()
        };

        var queuerId = Queuers.insert(queuer);

        return {
           _id: queuerId
        }
    }
});
