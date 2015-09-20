// global admin boolean aids in hiding or showing admin functionality

/*if (Meteor.server) {
    Meteor.methods({
        checkPassword: function(passwordDigest, thePassword) {
            check(passwordDigest, String);

            if (thePassword === 'Halloween_8') {
                //var user = Meteor.user();
                //var password = {
                //    digest: passwordDigest,
                //   algorithm: 'sha-256'
                //};
                
                //var result = Accounts._checkPassword(user, password);
                //throw new Meteor.Error('invalid-check', result);
                isAdmin = true;
                return true;
            } else {
                return false;
            }
        }
    });
}*/
