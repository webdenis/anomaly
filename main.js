$(function() {
	
	// Interval
	var interval = 1000;
	var color = 0;
	
	$(document).mousemove(function(getCurrentPos){
		var xCord = getCurrentPos.clientX;
		var yCord = getCurrentPos.clientY;

		var xPercent = Math.floor(xCord / $(window).width() * 100);
		var yPercent = Math.floor(yCord / $(window).height() * 100);
		
		//console.log(xPercent, yPercent);
		interval = xPercent * 2;
		color = Math.floor(yPercent * 2.55);
		
		
	});
	
	function randColor() {
		//return '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
		//return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
		

		/*var value = Math.random() * 0xFF | 0;
		var grayscale = (value << 16) | (value << 8) | value;
		var color = '#' + grayscale.toString(16);
		return color;*/
		/*if (up) {
			counter++;
		} else {
			counter--;
		}
		
		if (counter === 150) {
			up = false;
		}
		
		if (counter === 0) {
			up = true;
		}
		*/
		return 'rgb('+color+','+color+','+color+')';
	}
	/*var counter = 0;
	var up = true;*/
	
	// Prepare parameters and call le job
	$.fn.calcAndGo = function() {
		let x, y; // 1 = +, -1 = -
		a = (Math.floor(Math.random() * 15) + 5) / 10;
		b = Math.random() < 0.5 ? -1 : 1;
		c = Math.random() < 0.5 ? -1 : 1;
		
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
		//rect.unbind('mouseover');

		let prepy = rect.offset().top + y * rect.height();
		let prepx = rect.offset().left + x * rect.width();

		rect.css('left', prepx);
		rect.css('top', prepy);
		
		let cns = this[0].className;
		
		let randomColor = randColor();
		let newRect = $('<div />', {
			"class": cns
		})
		.css({
			'background-color' : randomColor,
		})
		/*.mouseover(function() {
			$(this).calcAndGo();
		})*/
		.prependTo('.main');
		
		rect.addClass('setForRemoval');
		setTimeout(function() {
			rect.remove();
		}, 1000);

		return this;
	}; 
	
	// Setup and go
	/*setInterval(function() {
		$(".rect").each(function() {
			if ($(this).hasClass('setForRemoval')) {
				console.log('nigga its set for removal');
			} else {
				$(this).calcAndGo();
			}
			
		});
	}, 50);*/
	
	function go() {
		setTimeout(function() {
			$(".rect").each(function() {
				if (! $(this).hasClass('setForRemoval')) {
					$(this).calcAndGo();
				}
			});
			go();
		}, interval);
	}
	
	go();
	
});