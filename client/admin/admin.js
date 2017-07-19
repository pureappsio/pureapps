Template.admin.events({

    'click #generate-key': function() {

        Meteor.call('generateApiKey');

    },
    'click #add-integration': function() {

        var accountData = {
            type: $('#integration-type :selected').val(),
            key: $('#integration-key').val(),
            url: $('#integration-url').val(),
            userId: Meteor.user()._id
        };
        Meteor.call('addIntegration', accountData);

    }

});

Template.admin.helpers({

    integrations: function() {
        return Integrations.find({});
    },

    key: function() {
        return Meteor.user().apiKey;
    },
    users: function() {
        return Meteor.users.find({});
    }

});
