Template.queueEdit.onRendered(function() {
    return this.$('#name').focus();
});

Template.queueEdit.events({
    'submit form': function(e) {
        e.preventDefault();
        // get current properties of the form
        var queuer = {
            name: $(e.target).find('[name=name]').val(),
            partySize: $(e.target).find('[name=party]').val(),
            phoneNumber: $(e.target).find('[name=phone]').val()
        };
        
        // name and party size are required
        if (queuer.name === '' || queuer.partySize === '') {
            sAlert.error('Name and party size required!');
            return false;
        }
        
        //console.log(queuer.phoneNumber);
        /*if (!isNaN(queuer.phoneNumber)) {
            sAlert.error('Please enter your phone number!');
            return false;
        }*/
        
        // client side update, might need more security settings
        Queuers.update(this._id, {
            $set: queuer
        }, function(error) {
            if (error) {
                sAlert.error('Error on edit');
                return false;
            } else {
                Router.go('queueList');
            }
        });
    }
});
