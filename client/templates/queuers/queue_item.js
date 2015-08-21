// global array holding all the wait times
waitTimes = [];

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
    // when ytou press the seat button
    'click .seat-btn': function(e) {

        // grab the queuer item from the database
        var queuer = Queuers.findOne({
            _id: this._id
        }, {});

        if (confirm('Are you sure you want to seat the customer?') && queuer.phoneNumber === '') {
            if (queuer._id === '') {
                return sAlert.error('Cant find queuer!');
            }

            var message = 'Your table for ' +
                queuer.partySize + ' is ready ' +
                queuer.name + '. Come on in!';

            var data = {
                queuer: queuer,
                message: message
            };

            // seat the customer and call the message method
            Meteor.call('messageQueuer', data, function(error, result) {
                if (error) {
                    return sAlert.error(error);
                }

                // get hours
                var fromHours = result.date.getHours(),
                    toHours = new Date().getHours();
                // get min
                var fromMin = result.date.getMinutes(),
                    toMin = new Date().getMinutes();
                // get both ti mes in a nice little object literal
                var waitTime = {
                    hours: toHours - fromHours,
                    min: toMin - fromMin
                };

                // reset to false to re-up the helper 
                Session.set('waitTimeBool', false);

                waitTimes.push(waitTime.min);

                if (waitTimes.length >= 1) {
                    Session.set('waitTimeBool', true);
                }
            });
            Meteor.call('queuerRemove', this._id, function(error, result) {
                if (error) {
                    return sAlert.error('Remove Error!');
                }
            });
        }
    }
});
