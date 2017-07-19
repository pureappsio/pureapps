Template.status.helpers({

    integrations: function() {

        return Integrations.find({});

    },
    globalStatus: function() {

        var count = Integrations.find({ status: 'offline' }).count();

        if (count > 0) {
            return true;
        } else {
            false;
        }

    }

});
