$(function() {
	
	var interval = 1000;
	var color = 0;
	var rectAnimation = 'none';
	
	/* 
		1 - grayscale
		2 - random non grayscale
		3 - black to white to black
	*/
	var currentColorMode = 1;
	
	// Mousemove interactivity
	$(document).mousemove(function(getCurrentPos){
		var xCord = getCurrentPos.clientX;
		var yCord = getCurrentPos.clientY;

		var xPercent = Math.floor(xCord / $(window).width() * 100);
		var yPercent = Math.floor(yCord / $(window).height() * 100);
		
		// Bottom to top = box generation interval
		interval = yPercent * 5 - 300;
		
		// Left to right = left or right rotation speed
		let speed;
		if (xPercent < 49) {
			speed = 0.05 + (xPercent / 5);
			rectAnimation = 'rotatingLeft '+speed.toFixed(1)+'s linear infinite';
		} else if (xPercent > 51) {
			speed = 5.05 - (xPercent - 50) / 10;
			rectAnimation = 'rotatingRight '+speed.toFixed(1)+'s linear infinite';
		} else {
			rectAnimation = 'none';
		}
		
		
	});
	
	// Color functions
	function getCurrentColor() {
		let x = 1;
		switch(currentColorMode) {
			case 1:
				x = getGrayscale();
				break;
			case 2:
				x = getRandomColor();
				break;
			case 3:
				x = getGrayscalePeriodic();
				break;
			case 4:
				x = getRandomBackground();
				break;
			default:
				x = getGrayscale();
		}
		return x;
	}
	
	function getGrayscale() { // 1
		var value = Math.random() * 0xFF | 0;
		var grayscale = (value << 16) | (value << 8) | value;
		var color = '#' + grayscale.toString(16);
		return color;
	}
	
	function getRandomColor() { // 2
		return '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
	}
	
	var counter = 0;
	var up = true;
	function getGrayscalePeriodic() { // 3
		if (up) {
			counter += 20;
		} else {
			counter -= 20;
		}
		
		if (counter === 260) {
			up = false;
		}
		
		if (counter === 0) {
			up = true;
		}
		
		return 'rgb('+counter+','+counter+','+counter+')';
	}
	
	function getRandomBackground() {
		let a = Math.floor(Math.random() * 100) + 1;
		let b = Math.floor(Math.random() * 100) + 1;
		return ("url('pic"+(Math.random() < 0.5 ? 1 : 2)+".jpg') "+a+"% "+b+"%");
	}
	// End of color functions
	
	// Color switch
	var firstColor = 1;
	var lastColor = 4;
	
	$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
		currentColorMode--;
		if (currentColorMode === (firstColor - 1)) { currentColorMode = lastColor; }
        break;

        case 39: // right
		currentColorMode++;
		if (currentColorMode === (lastColor + 1)) { currentColorMode = firstColor; }
        break;

        default: return;
    }
    e.preventDefault();
});

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
	
	// Move current and create new one
	$.fn.letsGo = function(x, y) {
	  
		let rect = $(this[0]);
		//rect.unbind('mouseover');

		let prepy = rect.offset().top + y * rect.height();
		let prepx = rect.offset().left + x * rect.width();

		rect.css('left', '-25%');
		rect.css('top', '-25%');
		rect.css('width', '150%');
		rect.css('height', '150%');
		
		let cns = this[0].className;
		
		let randomColor = getCurrentColor();
		let newRect = $('<div />', {
			"class": cns
		})
		.css({
			'background' : randomColor,
		})
		.css('-webkit-animation', rectAnimation)
		/*.mouseover(function() {
			$(this).calcAndGo();
		})*/
		.appendTo('.main');
		
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
			$(".fullrect").each(function() {
				if (! $(this).hasClass('setForRemoval')) {
					$(this).calcAndGo();
				}
			});
			go();
		}, interval);
	}
	
	go();
	
});