Template.header.onRendered(function() {
    return Session.set('isAdmin', false);
});

Template.header.helpers({
    admin: function() {
        if (Session.get('isAdmin')) {
            return true;
        } else {
            return false;
        }
    },
    avgWaitTime: function() {
        // if array has been added to it will trigger this session var to be true
        if (Session.get('waitTimeBool') === true) {
            var total = 0;
            // Add up all the values in the waittimes array
            for (var i = 0; i <= waitTimes.length; i++) {
                if (!isNaN(waitTimes[i])) {
                    total += waitTimes[i];
                }
            }
            
            // initialize to 0
            var avg = 0;

            // find the average wait time based on the total minus the amount of wait times
            avg = Math.round(Math.abs(total / waitTimes.length));
            
            // return a rounded average
            return avg;
        }
        return 0;
    }
});

Template.header.events({
    'click .add-btn': function() {
        $('#name').focus();
    },
    'click .log-out': function() {        
        if (confirm('Are you sure you want to LOG OUT?')) {
            Meteor.logout();
            return Session.set('isAdmin', false);
        }
    },
    'click .newboard-btn': function() {
        if (confirm('Sure you wanna reset dude?')) {
            Meteor.call('queueReset', function(error, result) {
                if (error) {
                    return console.log('Error on Reset');
                }
            });

            // reset waitTimes array
            waitTimes = [];
            return Session.set('waitTimeBool', false);
        }
    },
    'click .admin-login': function() {
        var password = prompt('Please enter your password again', '');

        if (password === 'Blackdog09!') {
            return Session.set('isAdmin', true);
        } else if (password === null) {
            return;
        } else {
            return sAlert.error('Incorrect Password');
        }
    },
    'click .admin-logout': function() {
        var confirmation = window.confirm('Are you sure you want to log Admin out?');

        if (confirmation === true) {
            return Session.set('isAdmin', false);
        }
    }
});
