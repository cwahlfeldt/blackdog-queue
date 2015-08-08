Template.queueItem.helpers({
    selected: function() {
        if (Meteor.user()) {
            if (Session.equals('selectedQueuer', this._id) && Session.get('isAdmin')) {
                return 'visible';
            } else {
                return 'hidden';
            }
        }

    },
    selectedPanel: function() {
        if (Meteor.user() && Session.get('isAdmin'))
            return Session.equals('selectedQueuer', this._id) ? 'selected' : '';
    },
    admin: function() {
        if (Session.get('isAdmin')) {
            return Session.get('isAdmin');
        } else {
            return Session.get('isAdmin');
        }
    },
    noNumberGlyph: function() {
        var queuer = Queuers.findOne({
            _id: this._id
        }, {});

        if (queuer.phoneNumber === '') {
            return 'mdi-communication-portable-wifi-off';
        } else {
            return '';
        }
    }
});

Template.queueItem.events({
    'click a.delete-btn': function() {
        if (confirm('Are you sure you want to delete this item?')) {
            Meteor.call('queuerRemove', this._id, function(error, result) {
                if (error) {
                    return console.log('Error on insert');
                }
            });
        }
    },
    'click .panel-body': function(e) {
        Session.set('selectedQueuer', this._id);
    },
    'click .seat-btn': function(e) {
        if (confirm('Are you sure you want to seat the customer?')) {
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
                queuer.partySize + ' is ready ' +
                queuer.name + '. Come on in!';

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
    }
});
