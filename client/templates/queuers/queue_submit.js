Template.queueSubmit.onRendered(function() {
    return $('#name').focus();
});

Template.queueSubmit.events({
    'submit form': function(e) {
        e.preventDefault();

        var queuer = {
            name: $(e.target).find('[name=name]').val(),
            partySize: $(e.target).find('[name=party]').val(),
            phoneNumber: $(e.target).find('[name=phone]').val()
        };

        if (queuer.name === '' || queuer.partySize === '') {
            sAlert.error('Name and party size required!');
            return false;
        }

        /*if (typeof queuer.phoneNumber !== 'number') {
            sAlert.error('Please enter your phone number!');
            return false;
        }*/

        Meteor.call('queuerInsert', queuer, function(error, result) {
            if (error) {
                return console.log('Error on insert');
            }

            console.log(result._id);

            scrollToAnchor(result._id);
        });

        $('#name').val('');
        $('#party').val('');
        $('#phone').val('');

        Router.go('queueList');
    }
});


