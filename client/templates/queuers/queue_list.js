Template.queueList.helpers({
    queuers: function() {
        return Queuers.find({}, {sort: {date: 1}});
    }
});
