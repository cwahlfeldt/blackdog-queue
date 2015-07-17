if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
        username: 'bdawg',
        email: 'cwahlfeldt1@gmail.com',
        password: 'Halloween_8',
        profile: {
            first_name: 'fname',
            last_name: 'lname',
            company: 'company',
        }
    });
}

if (Queuers.find().count() === -1) {
    Queuers.insert({
        name: 'Chris Wahlfeldt',
        partySize: 3,
        date: new Date()
    });

    Queuers.insert({
        name: 'Dylan Anderson',
        partySize: 8,
        date: new Date()
    });

    Queuers.insert({
        name: 'Rachel Faught',
        partySize: 2,
        date: new Date()
    });

    Queuers.insert({
        name: 'Chris Wahlfeldt',
        partySize: 3,
        date: new Date()
    });

    Queuers.insert({
        name: 'Dylan Anderson',
        partySize: 8,
        date: new Date()
    });

    Queuers.insert({
        name: 'Rachel Faught',
        partySize: 2,
        date: new Date()
    });

    Queuers.insert({
        name: 'Chris Wahlfeldt',
        partySize: 3,
        date: new Date()
    });

    Queuers.insert({
        name: 'Dylan Anderson',
        partySize: 8,
        date: new Date()
    });

    Queuers.insert({
        name: 'Rachel Faught',
        partySize: 2,
        date: new Date()
    });

    Queuers.insert({
        name: 'Chris Wahlfeldt',
        partySize: 3,
        date: new Date()
    });

    Queuers.insert({
        name: 'Dylan Anderson',
        partySize: 8,
        date: new Date()
    });

    Queuers.insert({
        name: 'Rachel Faught',
        partySize: 2,
        date: new Date()
    });

    Queuers.insert({
        name: 'Chris Wahlfeldt',
        partySize: 3,
        date: new Date()
    });

    Queuers.insert({
        name: 'Dylan Anderson',
        partySize: 8,
        date: new Date()
    });

    Queuers.insert({
        name: 'Rachel Faught',
        partySize: 2,
        date: new Date()
    });

    Queuers.insert({
        name: 'Chris Wahlfeldt',
        partySize: 3,
        date: new Date()
    });

    Queuers.insert({
        name: 'Dylan Anderson',
        partySize: 8,
        date: new Date()
    });

    Queuers.insert({
        name: 'Rachel Faught',
        partySize: 2,
        date: new Date()
    });
}
