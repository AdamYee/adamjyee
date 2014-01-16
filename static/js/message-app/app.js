define([
	'collections/MessageList',
	'views/AppView'
], function (
	MessageList,
	AppView
) {
	return function () {

		/**
		 * Initialize the message collection
		 */
		var Messages = new MessageList();

		/**
		 * Kick off the message app
		 */
		var appView = new AppView({
			'collection': Messages,
			'dispatcher': _.clone(Backbone.Events)
		});

	};
});