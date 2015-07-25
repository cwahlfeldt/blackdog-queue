Template.queueSubmit.onRendered(function() {
    return $('#name').focus();
});

Template.queueSubmit.events({
    'submit form': function(e) {
        e.preventDefault();
        // grab the input queuer info
        var queuer = {
            name: $(e.target).find('[name=name]').val(),
            partySize: $(e.target).find('[name=party]').val(),
            phoneNumber: $(e.target).find('[name=phone]').val()
        };
        
        // queuer info must be available
        if (queuer.name === '' || queuer.partySize === '') {
            sAlert.error('Name and party size required!');
            return false;
        }
        
        // insert the new queuer
        Meteor.call('queuerInsert', queuer, function(error, result) {
            if (error) {
                return console.log('Error on insert');
            }
            
            // get the id  
            var id = result._id;
            var url = window.location.href + '#' + id;
            // create the message
            var message = 'Thanks ' + queuer.name +
                ' check you place in line at ' + url;
            // grab all the data needed for the method to work correctly
            var data = {
                queuer: queuer,
                url: url,
                message: message,
                id: id
            };
            
            console.log(message);
            Meteor.call('messageQueuer', data, function(error, result) {
                if (error) {
                    return sAlert.error(error);
                }
                console.log('Message sending...');
            });
        });
        
        $('#name').val('');
        $('#party').val('');
        $('#phone').val('');
        Router.go('queueList');
    }
});
