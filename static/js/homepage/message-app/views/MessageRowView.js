define(function () {
	return Backbone.View.extend({
		
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
					this.options.dispatcher.trigger('done-delete');
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
});