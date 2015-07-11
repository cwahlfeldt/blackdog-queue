Template.queueSubmit.onCreated(function() {
    $('#myModal').on('shown.bs.modal', function() {
        $('#name').focus();
    });
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
            sAlert.error('Name and Party Size Required!');
            return false;
        }

        Meteor.call('queuerInsert', queuer, function(error, result) {
            if (error) {
                return console.log('Error on insert');
            }

            console.log(result._id);    

            thisId = result._id;

            scrollToAnchor(thisId);

        });

        $('#name').val('');
        $('#party').val('');
        $('#phone').val('');
        
        $('#myModal').modal('toggle');
    }
});

// scrolls nicely to an anchor that has the id of the most recently added in the list.
var scrollToAnchor = function(aid) {
    var tag = $('#' + aid);
    $('html,body').animate({scrollTop: tag.offset().top},'slow');
}
