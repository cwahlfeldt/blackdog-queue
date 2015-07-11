Router.configure({
    layoutTemplate: 'layout', 
    waitOn: function() {
        return Meteor.subscribe('queuers');
    }
});

Router.route('/', {
    name: 'queueList'
});
