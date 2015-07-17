Router.configure({
    layoutTemplate: 'layout', 
    waitOn: function() {
        return Meteor.subscribe('queuers');
    }
});

Router.route('/', {
    name: 'queueList'
});

Router.route('/login', {
    name: 'signIn'
});

Router.route('/submit', {
    name: 'queueSubmit'
});

AccountsTemplates.configureRoute('signIn');
