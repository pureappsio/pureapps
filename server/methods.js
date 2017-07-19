Meteor.methods({

    checkStatus: function() {

        var integrations = Integrations.find({}).fetch();

        for (i in integrations) {

            Meteor.call('checkIntegrationStatus', integrations[i]);

        }

    },
    checkIntegrationStatus: function(integration) {

        // Make request
        var baseUrl = "https://" + integration.url + "/api/status?key=" + integration.key;

        console.log('Checking integration ' + integration.url);

        try {

            var answer = HTTP.get(baseUrl);
            if (answer.data) {
                if (answer.data == null) {
                    var status = 'offline';
                } else {
                    var status = 'online';
                }
            } else {
                var status = 'offline';
            }

        } catch (err) {
            var status = 'offline';
        }

        // Get current status
        if (integration.status) {

            var pastStatus = integration.status;

            if (pastStatus != status) {

                console.log('Sending notification');

                if (status == 'online') {
                    var message = 'Integration ' + integration.url + ' came back online.';
                } else {
                    var message = 'Integration ' + integration.url + ' just went offline!';
                }

                pushoverUrl = 'https://api.pushover.net/1/messages.json';
                parameters = {
                    message: message,
                    user: Meteor.settings.pushover.user,
                    token: Meteor.settings.pushover.token
                }

                HTTP.post(pushoverUrl, { params: parameters });

            }

        }

        // Update
        Integrations.update(integration._id, { $set: { status: status } });

    },
    deleteUser: function(userId) {

        console.log('Deleting user');

        Meteor.users.remove(userId);

    },
    validateApiKey: function(key) {

        var adminUser = Meteor.users.findOne({ apiKey: { $exists: true } });

        if (adminUser.apiKey == key) {
            return true;
        } else {
            return false;
        }

    },
    generateApiKey: function() {

        // Check if key exist
        if (!Meteor.user().apiKey) {

            // Generate key
            var key = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 16; i++) {
                key += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            console.log(key);

            // Update user
            Meteor.users.update(Meteor.user()._id, { $set: { apiKey: key } });
        }

    },
    addIntegration: function(data) {

        // Check if it doesn't exist
        if (Integrations.findOne({ url: data.url })) {

            // Update
            Integrations.update({ url: data.url }, data);

            // Return ID
            return Integrations.findOne({ url: data.url })._id;

        } else {

            // Insert
            var integrationId = Integrations.insert(data);
            return integrationId;

        }

    },
    removeIntegration: function(data) {

        // Insert
        Integrations.remove(data);

    },
    getIntegrations: function() {

        return Integrations.find({}).fetch();

    },
    createUsers: function() {

        // Create admin user
        var adminUser = {
            email: Meteor.settings.adminUser.email,
            password: Meteor.settings.adminUser.password,
            role: 'admin'
        }
        Meteor.call('createNewUser', adminUser);

    },
    createUserAccount: function(data) {

        console.log(data);

        // Create account on dashboard
        if (Meteor.users.findOne({ "emails.0.address": data.email })) {

            console.log('User already created');
            var userId = Meteor.users.findOne({ "emails.0.address": data.email })._id;

        } else {

            console.log('Creating new user');

            // Create
            var userId = Accounts.createUser(data);

            // Change role
            Meteor.users.update(userId, { $set: { role: 'appuser' } });


        }

        console.log(Meteor.users.findOne(userId));

        // Create account on all integrations
        var integrations = Integrations.find({}).fetch();

        // Parameters
        var parameters = {
            email: data.email,
            password: data.password,
            role: 'appuser'
        }

        for (i in integrations) {

            console.log('Creating account on' + integrations[i].url);

            // Make request
            var baseUrl = "https://" + integrations[i].url + "/api/users?key=" + integrations[i].key;

            try {
                var answer = HTTP.post(baseUrl, { params: parameters });
            } catch (err) {
                var answer = {};
            }

            console.log(answer);

        }

        return userId;

    },
    createNewUser: function(data) {

        // Check if exist
        if (Meteor.users.findOne({ "emails.0.address": data.email })) {

            console.log('User already created');
            var userId = Meteor.users.findOne({ "emails.0.address": data.email })._id;

        } else {

            console.log('Creating new user');

            // Create
            var userId = Accounts.createUser(data);

            // Change role
            Meteor.users.update(userId, { $set: { role: data.role } });
            console.log(Meteor.users.findOne(userId));

        }

    }

});
