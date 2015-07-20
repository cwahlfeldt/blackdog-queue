Template.queueItem.events({
    'click a.delete-btn': function() {
        Meteor.call('queuerRemove', this._id, function(error, result) {
            if (error) {
                return console.log('Error on insert');
            }
        }); 
    },
    'click .panel-body': function(e) {
        //$(e.target).addClass('bg-warning'); 
    }
});
