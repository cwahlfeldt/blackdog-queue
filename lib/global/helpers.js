// scrolls nicely to an anchor that has the id of the most recently added in the list.
scrollToAnchor = function(aid) {
    var tag = $('#' + aid);

    $('html,body').animate({
        scrollTop: tag.offset().top
    }, 'slow');
};
