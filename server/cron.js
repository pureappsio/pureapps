SyncedCron.config({
    log: false
});

SyncedCron.add({
    name: 'Check status',
    schedule: function(parser) {
        // parser is a later.parse object
        return parser.text('every 1 minute');
    },
    job: function() {
        Meteor.call('checkStatus');
    }
});
