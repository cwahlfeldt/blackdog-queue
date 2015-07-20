Queuers = new Mongo.Collection('queuers');

// allow an update from the client
Queuers.allow({
    update: function() {
        return true;
    }
});

Meteor.methods({
    // insert a new queuer at the bottom of the list
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
    },
    // remove a single queuer
    queuerRemove: function(id) {
        if (id) {
            Queuers.remove(id);
        }
    },
    // reset the entire db of queuers
    queueReset: function() {
        Queuers.remove({});
    }
});
