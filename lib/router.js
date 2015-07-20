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

Router.route('/queue/:_id/edit', {
    name: 'queueEdit',
    data: function() {
        return Queuers.findOne(this.params._id);
    }
});

AccountsTemplates.configureRoute('signIn');
