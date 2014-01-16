define([
	'views/MessageRowView'
	],
function (MessageRowView) {
	return Backbone.View.extend({
		el: $('#message-app'),
		rows: {},
		
		events: {
			'click #submit'		: 'saveMessage',
		},
		
		initialize: function() {
			this.input = $("#msg");

			this.listenTo(this.collection, 'add', this.addMessage);
			this.listenTo(this.collection, 'remove', this.removeMessage);

			this.timer = null;
			this.pollMessages(this);
			
			this.options.dispatcher.on('done-delete', this.resetPoll, this);
		},
		
		pollMessages: function(view) {
			// console.log('polled');
			// console.log(Messages);
			this.collection.fetch({
				success: function(collection, response, options) {
					// console.log('successfully fetched messages');
				},
				error: function() {
					console.log('error on fetching messages');
				},
				complete: function() {
					// console.log('recursed');
					view.timer = setTimeout(function() {
						view.pollMessages(view);
					}, 1000);
				}
			});
		},
		
		resetPoll: function() {
			// reset polling out 1000ms to ensure the animation and deletion finishes
			// before fetching messages and firing a change event
			var view = this;
			clearTimeout(this.timer);
			this.timer = setTimeout(function(){
				view.pollMessages(view);
			}, 1000);
		},
		
		render: function() {
			return this;
		},
		
		addMessage: function(msg) {
			var view = new MessageRowView({
				'model': msg,
				'dispatcher': this.options.dispatcher
			});
			this.$('#message-list').append(view.render().el);
			view.$el.slideDown('default');
			this.rows[msg.id] = view;
		},
		
		removeMessage: function(msg) {
			var view = this.rows[msg.id];
			view.$el.slideUp('default', function(){
				view.remove();
			});
		},
		
		saveMessage: function(e) {
			e.preventDefault();
			if (!this.input.val()) {
				$('#msg').fadeOut(70).fadeIn(70).fadeOut(70).fadeIn(70);
				return;
			}
			
			if (this.collection.lessFive()) {
				
				this.collection.create(
					{	message: this.input.val()	},
					{ // options
						wait: true,
						success: function() {
							$('#notification:visible').slideUp();
							$('#form')[0].reset();
						},
						error: function(m, response) {
							$('#notify-text').text($.parseJSON(response.responseText).message);
							$('#notification:hidden').slideDown();
						}
					}
				);
			}
			else {
				$('#notify-text').text('Five messages are enough...');
				$('#notification:hidden').slideDown();
				$('#form')[0].reset();
			}
		}
	});
});