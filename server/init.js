Meteor.startup(function() {

    process.env.MAIL_URL = Meteor.settings.MAIL_URL;

    // Allow delete users
    Meteor.users.allow({
        remove: function() {
            return true;
        }
    });

    // Create admin user
    Meteor.call('createUsers');

    // Meteor.call('checkStatus');

     // Cron
    SyncedCron.start();

});
