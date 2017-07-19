Template.integrationStatus.helpers({

    statusLabel: function() {

        if (this.status) {

        	if (this.status == 'online') {
        		return 'success';
        	}
        	else {
        		return 'danger';
        	}

        }
        else {
        	return 'primary';
        }

    },
    statusText: function() {

        if (this.status) {

        	if (this.status == 'online') {
        		return 'ONLINE';
        	}
        	else {
        		return 'OFFLINE';
        	}

        }
        else {
        	return 'UNKNOWN';
        }

    }

});
