define(function (require) {
	var app = require('durandal/app'),
		ko = require('knockout'),
		$ = require('jquery'),
		_ = require('underscore'),

		messages = ko.observableArray([]);

	$.get('/messages/')
	.done(function (data) {
		if (data.length > 0) {
			_.each(data, function (m) {
				messages.push(m);
			});
		}
	})
	.fail(function (data) {
		console.log('failed', data);
	});

	return {
		'messages': messages
	};
});