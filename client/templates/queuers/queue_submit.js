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
        
        // Early form of phonenumber validation
        //queuer.phoneNumber.replace(/\D/g, '');
        
        // Format the name to look better, just read the function name... lol
        queuer.name = queuer.name.capitalizeFirstLetterAndLowerCaseTheRest();

        // Queuer info must be available
        if (queuer.name === '' || queuer.partySize === '') {
            sAlert.error('Name and party size required!');
            return false;
        }

        if ((queuer.phoneNumber.toString().length < 10) 
            && queuer.phoneNumber !== '') {
            return sAlert.error('Please include area code');
        }

        // insert the new queuer
        Meteor.call('queuerInsert', queuer, function(error, result) {
            if (error) {
                return console.log('Error on insert');
            }

            if (queuer.phoneNumber !== '') {
                // get the id  
                var id = result._id;
                var url = window.location.href + '#' + id;
                // create the message
                var message = 'Thanks ' + queuer.name +
                    ', check your place in line at ' + url;
                // grab all the data needed for the method to work correctly
                var data = {
                    queuer: queuer,
                    url: url,
                    message: message,
                    id: id
                };

                console.log('Message sent: ' + message);

                Meteor.call('messageQueuer', data, function(error, result) {
                    if (error) {
                        return sAlert.error(error);
                    }
                });
            }
        });

        $('#name').val('');
        $('#party').val('');
        $('#phone').val('');

        Router.go('queueList');

        return sAlert.success('Thanks');
    }
});

// add a new function to the string object to uppcase the first letter and lowercase the rest 
String.prototype.capitalizeFirstLetterAndLowerCaseTheRest = function() {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};
