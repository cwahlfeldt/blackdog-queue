// global array holding all the wait times
waitTimes = [];

Template.queueItem.onRendered(function() {
    Session.set('hider', true);
});

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
    },
    phoneNumberExists: function() {
        var queuer = Queuers.findOne({
            _id: this._id
        }, {});

        if (queuer.phoneNumber === '') {
            return false;
        } else {
            return true;
        }
    },
    texted: function() {
        var queuer = Queuers.findOne({
            _id: this._id
        }, {});

        if (queuer.texted) {
            return 'bg-warning';
        }
    },
    time: function() {
        var queuer = Queuers.findOne({
            _id: this._id
        }, {});

        return formatAmPm(queuer.date);
    },
    hider: function() {
        // hides time when queuer is selected
        if (Session.equals('selectedQueuer', this._id) && 
            Meteor.user() && 
            Session.get('isAdmin'))
        {
            return 'hidden';
        }

        return 'visible';
    }
});

Template.queueItem.events({
    'click a.delete-btn': function() {
        if (confirm('Are you sure you want to DELETE this item?')) {
            Meteor.call('queuerRemove', this._id, function(error, result) {
                if (error) {
                    return console.log('Error on insert');
                }

                return sAlert.success('The queuer has been deleted');
            });
        }
    },
    'click .panel-body': function(e) {
        Session.set('selectedQueuer', this._id);

        /*if ($(e.target).find($('.panel-body').hasClass('selected'))) {
            $(e.target).find($('.time')).addClass('hidden');
        } else {
            $(e.target).find($('.time')).removeClass('hidden');
        }*/

    },
    'focus .panel': function() {
        Session.set('hider', true);
    },
    'blur .panel': function() {
        Session.set('hider', false);  
    },
    // just text the person and not delete them
    'click .text-btn': function(e) {
        // grab the queuer item from the database
        var queuer = Queuers.findOne({
            _id: this._id
        }, {});

                // client side update, might need more security settings
        Queuers.update(this._id, {
            $set: {texted: true}
        }, function(error) {
            if (error) {
                sAlert.error('Error on edit');
            } else {
                Router.go('queueList');
            }
        });

        // no need to message the queuer if no phone number has been placed
        if (queuer.phoneNumber !== '') {
            if (confirm('Are you sure you want to TEXT the customer')) {
                if (queuer._id === '') {
                    return sAlert.error('Cant find queuer!');
                }

                // create the message
                var message = 'Your table for ' +
                    queuer.partySize + ' is ALMOST ready.' +
                    ' Please see the host for more details.';

                // get message and queuer in a data variable
                var data = {
                    queuer: queuer,
                    message: message
                };

                // seat the customer and call the message method
                Meteor.call('messageQueuer', data, function(error, result) {
                    if (error) {
                        return sAlert.error(error);
                    }

                    sAlert.success('The customer has been texted');

                });

                Session.set('texted', this._id);

            }
        } else {
            return sAlert.error('Customer did not enter a phone number');
        }
    },
    // text the queuer and remove them from the queue
    'click .seat-btn': function(e) {

        // grab the queuer item from the database
        var queuer = Queuers.findOne({
            _id: this._id
        }, {});

        if (confirm('Are you sure you want to SEAT the customer?')) {
            if (queuer._id === '') {
                return sAlert.error('Cant find queuer!');
            }

            sAlert.success('Seated ' + queuer.name);

            /*
            // no need to message the queuer if no phone number has been placed
            if (queuer.phoneNumber !== '') {
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

                    return sAlert.success('The customer has been seated');
                });
            }
            */

            // remove queuer from line after being sent a message
            Meteor.call('queuerRemove', this._id, function(error, result) {
                if (error) {
                    return sAlert.error('Remove Error!');
                }
            });
        }
    }
});

// format date time to 12 hour clock not 24
var formatAmPm = function(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
};
