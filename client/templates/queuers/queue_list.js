Template.queueList.helpers({
    queuers: function() {
        if (Meteor.user() !== null) {
            return Queuers.find({
                author: Meteor.userId()
            }, {
                sort: {
                    date: 1
                }
            });
        } else {
            return Queuers.find({}, {
                sort: {
                    date: 1
                }
            });

        }
    }
});

// uncomment to utlize animations, somewhat broken.
/*Template.queueList.animations({
    ".item-wrapper": {
        container: ".list-wrapper", // container of the ".item" elements
        in : "animated bounceInUp", // class applied to inserted elements
        out: "animated bounceOutDown", // class applied to removed elements
        inCallback: function(element) {}, // callback after an element gets inserted
        outCallback: function(element) {}, // callback after an element gets removed
        delayIn: 0, // Delay before inserted items animate
        delayOut: 0, // Delay before removed items animate
        animateInitial: true, // animate the elements already rendered
        animateInitialStep: 100, // Step between animations for each initial item
        animateInitialDelay: 50 // Delay before the initial items animate
    }
});*/
