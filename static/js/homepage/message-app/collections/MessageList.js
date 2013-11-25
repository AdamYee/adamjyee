define(['models/Message'], function (Message) {
	return Backbone.Collection.extend({
		model: Message,
		url: '/messages/',
		
		lessFive: function() {
			return (this.length < 5) ? true : false;
		}
	});
});