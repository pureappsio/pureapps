// Meteor.publish("userSales", function () {
// 	return Sales.find();
// });

Meteor.publish("allUsers", function () {
	return Meteor.users.find({});
});

Meteor.publish("userIntegrations", function() {
    return Integrations.find({});
});