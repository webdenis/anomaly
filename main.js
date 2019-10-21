$(function() {
	
	// Prepare parameters and call le job
	$.fn.calcAndGo = function() {
		let x, y; // 1 = +, -1 = -
		
		if ($(this).hasClass('topleft')) {
			x = -1; y = -1;
		}
		
		if ($(this).hasClass('topright')) {
			x = 1; y = -1;
		}
		
		if ($(this).hasClass('bottomleft')) {
			x = -1; y = 1;
		}
		
		if ($(this).hasClass('bottomright')) {
			x = 1; y = 1;
		}
		
		// call function with prepared parameters
		$(this).letsGo(x, y);
	};
	
	// Move current, create new one underneath
	$.fn.letsGo = function(x, y) {
	  
		let rect = $(this[0]);
		rect.unbind('mouseover');

		let prepy = rect.offset().top + y * rect.height();
		let prepx = rect.offset().left + x * rect.width();

		rect.css('left', prepx);
		rect.css('top', prepy);
		
		let cns = this[0].className;
		
		let randomColor = '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
		let newRect = $('<div />', {
			"class": cns
		})
		.css({
			'background-color' : randomColor,
		})
		.mouseover(function() {
			$(this).calcAndGo();
		})
		.prependTo('.main');
		
		rect.addClass('setForRemoval');
		setTimeout(function() {
			rect.remove();
		}, 1000);

		return this;
	}; 
	
	// Setup and go
	setInterval(function() {
		$(".rect").each(function() {
			if ($(this).hasClass('setForRemoval')) {
				console.log('nigga its set for removal');
			} else {
				$(this).calcAndGo();
			}
			
		});
	}, 250);
	
});