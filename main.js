$(function() {
	
	// Interaction variables
	var interval = 400;
	var color = 0;
	var rectAnimation = 'none';
	var destructTimer = 1000;
	
	var currentMouseX = 50;
	var currentMouseY = 50;
	
	var intervalMouseMode = true; 
	
	var lockCursor = false;
	
	var lockRotation = false;
	
	// Additional info variables
	var infoRotation = 'none';
	var infoColorMode = 'grays';
	
	function updateInfo() {
		$("#infoCursorPosition").text(!lockCursor);
		$("#infoRotationLock").text(lockRotation);
		$("#infoRotation").text(infoRotation);
		$("#infoColorMode").text(infoColorMode);
		$("#infoInterval").text(interval.toFixed(0) + 'ms');
		$("#infoDestruct").text(destructTimer + 'ms');
	}
	
	updateInfo();
	
	/* 
		1 - grayscale
		2 - random non grayscale
		3 - black to white to black
		4 - pics
	*/
	var currentColorMode = 1;
	
	// Mouse buttons interactivity
	$('.main').mousedown(function(event) {
		switch (event.which) {
			case 1: // lmb
				lockRotation = !lockRotation;
				break;
			case 2: // mmb
				break;
			case 3: // rmb
				lockCursor = !lockCursor;
				break;
			default:
				console.log('8-)');
		}
	});
	
	$('.main').on('contextmenu', function(event){
        event.preventDefault();
    });
	
	// Mouse move interactivity
	$(document).mousemove(function(getCurrentPos){
		var xCord = getCurrentPos.clientX;
		var yCord = getCurrentPos.clientY;

		var xPercent = Math.floor(xCord / $(window).width() * 100);
		var yPercent = Math.floor(yCord / $(window).height() * 100);
		
		if (!lockCursor) {
			currentMouseX = xPercent;
			currentMouseY = yPercent;
		}
		
		// Bottom to top = box generation interval
		if (intervalMouseMode) {
			interval = 0.04*(Math.pow(yPercent,2));
			$("#intervalSlider").slider('value', yPercent);
		}
		//interval = Math.floor(Math.pow(yPercent, 1.2));
		//interval = 0.04*(Math.pow(yPercent,2));
		
		// Left to right = left or right rotation speed
		if (!lockRotation) {
			let speed;
			if (xPercent < 49) {
				speed = 0.1 + 0.00023 * Math.pow(xPercent, 3.32);
				rectAnimation = 'rotatingLeft '+speed.toFixed(1)+'s linear infinite';
				infoRotation = 'left ' + speed.toFixed(1) + 's';

			} else if (xPercent > 51) {
				speed = -1.25 + 101.25 / Math.pow(2, ((xPercent - 50) / 7.886));
				rectAnimation = 'rotatingRight '+speed.toFixed(1)+'s linear infinite';
				infoRotation = 'right ' + speed.toFixed(1) + 's';
			} else {
				rectAnimation = 'none';
				infoRotation = 'none';
			}
		}
		
		updateInfo();
		
	});
	
	// Color functions
	function getCurrentColor() {
		let x = 1;
		switch(currentColorMode) {
			case 1:
				x = getGrayscale();
				infoColorMode = 'grays';
				break;
			case 2:
				x = getRandomColor();
				infoColorMode = 'random colors';
				break;
			case 3:
				x = getGrayscalePeriodic();
				infoColorMode = 'grays periodic';
				break;
			case 4:
				x = getRandomBackground();
				infoColorMode = 'pictures';
				break;
			default:
				x = getGrayscale();
				infoColorMode = 'grays';
		}
		updateInfo();
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

		let prepy = rect.offset().top + y * rect.height();
		let prepx = rect.offset().left + x * rect.width();
		
		let calc = 0;

		rect.css({'left': '-=25%'});
		rect.css({'top': '-=25%'});
		rect.css({'width': '+=150%'});
		rect.css({'height': '+=150%'});
		
		let cns = this[0].className;
		
		let randomColor = getCurrentColor();
		let newRect = $('<div />', {
			"class": cns
		})
		.css({
			'background' : randomColor,
		})
		.css('-webkit-animation', rectAnimation)
		.css({left: currentMouseX+'%', top: currentMouseY+'%'})
		.appendTo('.main');
		
		rect.addClass('setForRemoval');
		setTimeout(function() {
			rect.remove();
		}, destructTimer);

		return this;
	}; 
	

	
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
	
	// Interval slider init
	$( "#intervalSlider" ).slider({
		range: "min",
		value: interval,
		min: 1,
		max: 100,
		slide: function( event, ui ) {
			interval = 0.04*(Math.pow(ui.value,2));
			updateInfo();
		}
    });
	
	$("#intervalModeTick").change(function() {
		intervalMouseMode = !this.checked;
	});
	
	// Self destruct timer slider init
	$( "#destructSlider" ).slider({
		range: "min",
		value: destructTimer,
		min: 100,
		max: 3000,
		slide: function( event, ui ) {
			destructTimer = ui.value;
			updateInfo();
		}
    });
	
});