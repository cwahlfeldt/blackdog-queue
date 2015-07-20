Template.header.events({
    'click .add-btn': function() {
        $('#name').focus();
    },
    'click .log-out': function() {
        Meteor.logout();
    },
    'click .newboard-btn': function() {
        Meteor.call('queueReset',  function(error, result) {
            if (error) {
                return console.log('Error on Reset');
            }
        });
    }
});
