$(function(){
	var url = document.location.toString();
	if (url.match('#')) {
	    $('.nav-tabs a[href=#'+url.split('#')[1]+']').tab('show') ;
	}
	
	$('div.section').hide();
	$('#show-all').text('show all');
	$('.togglers').addClass('icon-plus');
	
	// toggle single 
	$('.section-toggle').click(function(){
		$(this).parent().next('div.section').slideToggle(300);
		$(this).children().toggleClass('icon-plus icon-minus');
		specialToggle();
	});

	// toggle all 
	$('#show-all').click(function(){
		if ($(this).text() == 'show all') { // click to show all 
			$(this).text('close all');
			$('div.section').slideDown();
			
			$('.togglers').each(function(){ // if icon is already +, then toggle is to - 
				if ($(this).hasClass('icon-plus') == true) {
					$(this).toggleClass('icon-plus icon-minus');
				}
			});
		}
		else {								// click to close all 
			$(this).text('show all');
			$('div.section').slideUp();
			
			$('.togglers').each(function(){ // if icon is already -, then toggle is to + 
				if ($(this).hasClass('icon-minus') == true) {
					$(this).toggleClass('icon-plus icon-minus');
				}
			});
		}
	});
	
	// toggle special case 
	var specialToggle = function() {
		var allplus = true;
		var allminus = true;
		$('i.togglers').each(function() {
			if ($(this).hasClass('icon-minus') == true) {
				allplus = false;
			}
			else if ($(this).hasClass('icon-plus') == true) {
				allminus = false;
			}
		});
		if (allplus) {
			$('#show-all').text('show all');
		}
		else if (allminus) {
			$('#show-all').text('close all');
		}
	}
});