describe("Message model", function() {
	var msg;
	var server;
	var Messages;
	
	beforeEach(function() {
		msg = new Message();
	});
	
	describe("when creating a new message", function() {
		
		it("should have empty default text", function() {
			//
			expect(msg.get('message')).toBe('');
		});
	});

	describe("Testing message fetch", function() {
		var cbs,
			foo = null,
			data;

		beforeEach(function() {
			server = sinon.fakeServer.create();
		});
		afterEach(function() {
			server.restore();
		});


		it("should use the correct url on fetch", function() {
			spyOn($, "ajax");
			var cb = jasmine.createSpy();
			
			msg.set({ id: 123});
			msg.fetch();

			expect($.ajax.mostRecentCall.args[0]["url"]).toEqual("/messages/123");
		});

		function getMsg(callback) {
			// $.ajax({
			// 	type: "GET",
			// 	url: "/messages/123",
			// 	contentType: "application/json",
			// 	dataType: "json",
			// 	success: callback,
			// 	complete: callback
			// });
			msg.fetch({
				success: function(model, response, options){
					callback();
					console.log(response);
				},
				error: function(model, response, options) {
					callback();
					console.log(response);
				},
				complete: function(){
					console.log('always executed');
				}
			});
		}

		// fake response with Sinon.
		it('should return a response body and invoke a callback (fake server)', function() {
			var callback = jasmine.createSpy();

			server.respondWith("GET", "/messages/123",
								[200, { "Content-Type": "application/json" },
								'{ "id": 123, "message": "foobar" }']);

			msg.set({ id: 123});
			getMsg(callback);

			server.respond();

			expect(callback).toHaveBeenCalled();

			console.log(msg);
			expect(msg.get('message')).toEqual('foobar');
		});

		//TODO - test pollMessages and resetPoll
	});
});