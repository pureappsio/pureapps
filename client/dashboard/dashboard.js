Template.dashboard.helpers({

    integrationStyle: function(integration) {
        if (!Integrations.findOne({ type: integration })) {
            return 'integration-not-present';
        }
        else {
        	return 'integration-present';
        }
    },
    integrationLink: function(integration) {
        if (Integrations.findOne({ type: integration })) {
            return 'https://' + Integrations.findOne({ type: integration }).url;
        }
    }

});
