Router.configure({
    layoutTemplate: 'layout',
    waitOn: function() {
        return Meteor.subscribe('queuers');
    }
});

Router.route('/', {
    name: 'queueList'
});

    // for the champaign location 
Router.route('/champaign', function() {
    this.render('queueList'); 
});

// for the urbana location
Router.route('/urbana', function() {
    this.render('queueList');
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
/*
// define this as a global onBeforeAction so it happens all the time
Router.onBeforeAction(function() {
    $('#content').removeClass('animated fadeIn');
    //$('#content').addClass('animated fadeOut');
    return this.next();
});

Router.onAfterAction(function() {
    return $('#content').addClass('animated fadeIn');
});
*/
