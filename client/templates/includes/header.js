Template.header.onRendered(function() {
    Session.set('isAdmin', false);
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
        if (waitTimes.length() >= 2) {
            var total = 0;
            for (var i = 0; i <= waitTimes.length; i++) {
                total += waitTimes[i];
            }
            var avg = total / waitTimes.length;
            return avg;
        }
    }
});

Template.header.events({
    'click .add-btn': function() {
        $('#name').focus();
    },
    'click .log-out': function() {
        Session.set('isAdmin', false);
        Meteor.logout();
    },
    'click .newboard-btn': function() {
        if (confirm('Sure you wanna reset dude?')) {
            Meteor.call('queueReset', function(error, result) {
                if (error) {
                    return console.log('Error on Reset');
                }
            });
        }
    },
    'click .admin-login': function() {
        var password = prompt('Please enter your password again', 'Your Password Again');

        if (password === 'Halloween_8') {
            Session.set('isAdmin', true);
        }
    },
    'click .admin-logout': function() {
        var confirmation = window.confirm('Are you sure you want to log Admin out?');

        if (confirmation === true) {
            Session.set('isAdmin', false);
        }
    }
});
