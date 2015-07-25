Template.queueItem.helpers({
    selected: function() {
        return Session.equals('selectedQueuer', this._id) ? 'visible' : 'hidden';
    },
    selectedPanel: function() {
        return Session.equals('selectedQueuer', this._id) ? 'selected' : '';
    }
});

Template.queueItem.events({
    'click a.delete-btn': function() {
        Meteor.call('queuerRemove', this._id, function(error, result) {
            if (error) {
                return console.log('Error on insert');
            }
        });
    },
    'click .panel-body': function(e) {
        Session.set('selectedQueuer', this._id);
    },
    'click .seat-btn': function(e) {
        var queuer = Queuers.findOne({
            _id: this._id
        }, {});

        if (queuer._id === '') {
            return sAlert.error('Cant find queuer!');
        }

        if (queuer.phoneNumber === '') {
            return sAlert.error('User did not enter a phone number!');
        }

        var message = 'Your table for ' +
            queuer.partySize + ' is ready. ' +
            queuer.name + ', Come on in!';
        var data = {
            queuer: queuer,
            message: message
        };

        Meteor.call('messageQueuer', data, function(error, result) {
            if (error) {
                return sAlert.error(error);
            }

            console.log('Sending Message...');
        });

        Meteor.call('queuerRemove', this._id, function(error, result) {
            if (error) {
                return sAlert.error('Remove Error!');
            }
        });
    }
});
