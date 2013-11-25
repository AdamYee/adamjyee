define(function () {
	
	return function () {

		// MODELS 
			
		var Message = Backbone.Model.extend({
			urlRoot: '/messages/',
			
			defaults: {
				message: '',
			},
			
			initialize: function() {
				this.on('change:message', function(model) {
					console.log("message text changed to: " + model.get('message'));
				});
			},
			
			validate: function(attrs, options) {
				if (!attrs.message) {
					return "empty";
				}
			}
		});

		var MessageList = Backbone.Collection.extend({
			model: Message,
			url: '/messages/',
			
			lessFive: function() {
				return (this.length < 5) ? true : false;
			}
		});

		var Messages = new MessageList(); // initialize collection

		var viewDispatcher = _.clone(Backbone.Events);

		// VIEWS 

		var MessageRowView = Backbone.View.extend({
			
			tagName: 'div', // generates a new <div> 

			className: 'message-row',
							
			events: {
				'click a.delete'	: 'byebye',
				'click .edit-btn'	: 'edit',
				'blur .edit'		: 'done',
				'submit .edit-form'	: 'hitenter'
			},
			
			initialize: function() {
				console.log('MessageView initialized');
				console.log(Handlebars.templates);
				this.template = Handlebars.templates['message-row-default'];
				this.editting = false;
				
				this.model.on('change:message', this.afterEditRender, this);
			},
					
			render: function() {
				var t = this.template(this.model.toJSON());
				this.$el.html( t );
				if (this.template === Handlebars.templates['message-row-edit']) {
					this.input = this.$('#message'+this.model.get('id'));
					this.input.css({width:0});
				}
				return this;
			},
			
			afterEditRender: function() {
				if (this.model.get('message') !== '' && this.editting === false) {
					//TODO fancy async render
					this.render();
				}
			},
			
			byebye: function(e) {
				if (e) e.preventDefault();
				console.log('destroying: ' + this.model.attributes.message);

				var view = this;
				
				view.model.destroy({
		 			wait: true, // we kinda want to wait for the server to respond before removing the model and associated view
		 			success: function(model, resp, options){
		 				view.$el.slideUp('default', function(){
		 					view.remove();
		 				});
		 				console.log('destroyed and removed ----------------');
		 			},
		 			error: function(model, xhr, options) {
		 				console.log('error destroying');
		 				alert(xhr.statusText + ', message not deleted.');
		 			}
		 		});
			},
			
			edit: function(e) {
				e.preventDefault();
				this.editting = true;
				this.template = Handlebars.templates['message-row-edit'];
				this.render();
				this.input.animate({
						width : 626
					}, 200);
				this.input.focus().val(this.input.val());
			},

			hitenter: function(e) {
				e.preventDefault();
				this.input.blur(); // fake the blur 
			},
			
			done: function(e) {
				if (e && e.type == 'submit') {
					e.preventDefault();
				}
				this.template = Handlebars.templates['message-row-default'];
				
				// if the message is different than before
				if (this.model.get('message') !== this.input.val()) {
					// save if the model changed
					this.model.save({message: this.input.val()}, {
						success: function() {
							console.log('successfully edited');
							console.log('model saved');
						},
						error: function() {
							console.log('error editting message');
						}
					});
					if (this.input.val() === '') {
						// trigger event to block polling until message has been deleted or modified
						// otherwise, the out of sync will cause split second animation glitches
						viewDispatcher.trigger('done-delete');
					}
				}

				// console.log('done');
				this.editting = false;
				var view = this;
				this.input.animate({width : 0}, 350, function(){
					view.render();
					// remove the message if the text is empty, but only after animation has finished
					if (view.model.get('message') === '') {
						view.byebye();
					}
					else {
						// reset width
						$(this).css('width',''); // this refers to the jquery div selector
					}
				});
			}
		});
			
		AppView = Backbone.View.extend({
			el: $('#message-app'),
			rows: {},
			
			events: {
				'click #submit'		: 'saveMessage',
			},
			
			initialize: function() {
				this.input = $("#msg");

				this.listenTo(Messages, 'add', this.addMessage);
				this.listenTo(Messages, 'remove', this.removeMessage);

				this.timer = null;
				this.pollMessages(this);
				
				viewDispatcher.on('done-delete', this.resetPoll, this);
			},
			
			pollMessages: function(view) {
				// console.log('polled');
				// console.log(Messages);
				Messages.fetch({
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
				var view = new MessageRowView({model: msg});
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
			
			updateMessage: function(msg) {
				this.rows[msg.id].render();
			},
			
			saveMessage: function(e) {
				e.preventDefault();
				if (!this.input.val()) {
					$('#msg').fadeOut(70).fadeIn(70).fadeOut(70).fadeIn(70);
					return;
				}
				
				if (Messages.lessFive()) {
					
					Messages.create(
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

	}; // invoking returned function for this require module
});