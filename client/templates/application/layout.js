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
