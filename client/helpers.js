Template.registerHelper("truncate", function(number) {
    return number.toFixed(0);
});

Template.registerHelper("truncateTwo", function(number) {
    return number.toFixed(2);
});

Template.registerHelper("formatType", function(type) {
    if (type == 'puremail') {
        return 'PureMail';
    }
    if (type == 'purepages') {
        return 'PurePages';
    }
    if (type == 'puremetrics') {
        return 'PureMetrics';
    }
    if (type == 'purepages') {
        return 'PurePages';
    }
    if (type == 'pureschedule') {
        return 'PureSchedule';
    }
    if (type == 'purewebinar') {
        return 'PureWebinar';
    }
    if (type == 'pureprocess') {
        return 'PureProcess';
    }
    if (type == 'purepress') {
        return 'PurePress';
    }
    if (type == 'purecart') {
        return 'PureCart';
    }
    if (type == 'puredesk') {
        return 'PureDesk';
    }

    if (type == 'purecourses') {
        return 'PureCourses';
    }
    if (type == 'puresurvey') {
        return 'PureSurvey';
    }
    if (type == 'puresocial') {
        return 'PureSocial';
    }

});


Template.registerHelper("truncateString", function(string) {

    var maxLength = 30;
    if (string.length > (maxLength + 3)) {
        return string.substring(0, maxLength) + '...';
    } else {
        return string;
    }

});

Template.registerHelper("formatDate", function(date) {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
});

Template.registerHelper("formatDateShort", function(date) {
    return moment(date).format('MMMM Do YYYY');
});

Template.registerHelper("langEN", function() {
    if (Session.get('language')) {
        if (Session.get('language') == 'en') {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
});

Template.registerHelper("isAdmin", function() {
    if (Meteor.user()) {
        if (Meteor.user().role == 'admin') {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }

});
