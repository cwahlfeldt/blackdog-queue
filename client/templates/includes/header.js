Template.header.events({
    'click .add-btn': function() {
        $('#name').focus();
    },
    'click .log-out': function() {
        Meteor.logout();
    }
});
