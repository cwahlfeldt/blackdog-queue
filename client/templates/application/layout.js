Template.layout.helpers({
    hidden: function() {
        if ($(document).width() < 768) {
            return 'hidden';
        } else {
            return '';
        }
    },
    visible: function() {
        if ($(document).width() < 768) {
            return 'visible';
        } else {
            return 'hidden';
        }
    }
});

/*Template.layout.animations({
    '.big-wrap': {
        container: '#content', // container of the ".item" elements
        in : 'animated fadeIn', // class applied to inserted elements
        out: 'animated fadeOut', // class applied to removed elements
        inCallback: function(element) {}, // callback after an element gets inserted
        outCallback: function(element) {}, // callback after an element gets removed
        delayIn: 500, // Delay before inserted items animate
        delayOut: 500, // Delay before removed items animate
        animateInitial: true, // animate the elements already rendered
        animateInitialStep: 200, // Step between animations for each initial item
        animateInitialDelay: 500 // Delay before the initial items animate
    }
});*/
