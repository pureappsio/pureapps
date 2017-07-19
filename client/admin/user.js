Template.user.helpers({
    email: function() {
            return this.emails[0].address;
        }
        // earnings: function() {
        //     return Session.get('userEarnings' + this._id);
        // }

});

Template.user.events({
    'click .user-delete': function() {
        Meteor.call('deleteUser', this._id);
    }
});


Template.user.onRendered(function() {


});
