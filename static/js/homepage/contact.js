$(function() {

	var onHidden = function () {
		$('#thankyou').slideDown();
		
		$('#closety').click(function(){
			$('#thankyou').slideUp();
			$('#contact-modal').off('hidden',onHidden);
		});
	};
	
	$('#contact-form').submit(function(e) {
		e.preventDefault();
		$.ajax({
			type : "POST",
			url : "/contact/",
			data : $(this).serialize()
		})
		.done(function( data ) {
			$('#contact-modal')
				.modal('hide')
				.on('hidden', onHidden);
			
			$('#modal-body').load('/contact_modal/');
		})
		.fail(function(xhr, status, error){
			var resp = $.parseJSON(xhr.responseText);
			displayErrors(resp.errors);
			if ('valid' in resp) highlightValid(resp.valid);
		});
	});
	
	// hide thank you if sending another message 
	$('#contact-modal').on('shown', function(){
		var ty = $('#thankyou');
		if (ty.is(':visible') === true) {
			ty.slideUp();
			$('#contact-modal').off('hidden',onHidden);
		}
	});
	
	function displayErrors(errors) {
		for (var e in errors) {
			$('#errorid_'+e).empty().append(errors[e]).show('normal');
			$('#id_'+e).css('background-color','#FFE6E6');
		}
	}
    
	function highlightValid(valid) {
		$.each(valid, function(i, v) {
			$('#errorid_'+v).hide('normal');
			$('#id_'+v).css('background-color','#D7FFD7');
		});
	}
	
});