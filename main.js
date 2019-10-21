$(function() {
	
	/**
		@name Anomaly
		@version 0.6
		@github https://github.com/webdenis/anomaly
	**/
	
	/**	Default interaction variables **/
	var menu 				= true;		//	Show interaction & information menu
	var interval 			= 500; 		// 	Time between object generation
	
	var color 				= 0;		// 	Starting color
										
	var currentColorMode 	= 1;		/*	Currently used color mode
											1 - random grayscale
											2 - random non grayscale
											3 - black to white to black loop
											4 - two pictures backgrounds		*/
										
	var firstColor 			= 1; 		//	Number of first
	var lastColor 			= 4;		//	and last color	
	
	var rectAnimation 		= 'none';	// 	Generated CSS string for object rotation
	
	var animationTimer		= 1;		// 	Animation time in seconds
	
	var destructTimer 		= 1000; 	// 	Timer for object auto-destruction
	
	var currentMouseX 		= 50;		// 	Current Mouse X position in percentages
	var currentMouseY 		= 50;		//				  Y
	
	var intervalMouseMode 	= false;  	// 	Locks mouse affecting interval in Y scale
	
	var lockCursor 			= true;		// 	Generated objects appear at cursor position
	var lockRotation 		= false;	// 	Current object rotation is locked to mouse changes
	var lockInterval 		= false;	// 	Current interval is locked
	
										// 	Newly generated objects:
	var randomRotation 		= false;	// 	- Are randomly rotated
	var randomInterval 		= false;	//	- Appear within random intervals
	var randomLocation 		= false;	//	- Appear in random position
	var randomColors 		= false;	//	- Use random color mode
	
	var randomEvery 		= 1;		//	How many objects are generated between randomizations

	// End of default interaction variables
	
	/** Interaction menu and information functionality **/
	
	if (!menu) {
		$(".info").css('display', 'none');
	}
	
	var infoRotation = 'none';
	var infoColorMode = 'grays';
	
	function updateInfo() {
		$("#infoCursorPosition").text(!lockCursor ? "ON" : "OFF");
		$("#infoRotationLock").text(lockRotation ? "ON" : "OFF");
		$("#infoRotation").text(infoRotation);
		$("#infoColorMode").text(infoColorMode);
		$("#infoIntervalLock").text(lockInterval ? "ON" : "OFF");
		$("#infoInterval").text(interval.toFixed(0) + 'ms');
		$("#infoDestruct").text(destructTimer + 'ms');
		
		$("#infoRandomRotation").text(randomRotation ? "ON" : "OFF");
		$("#infoRandomInterval").text(randomInterval ? "ON" : "OFF");
		$("#infoRandomLocation").text(randomLocation ? "ON" : "OFF");
		$("#infoRandomColors").text(randomColors ? "ON" : "OFF");
		$("#infoRandomEvery").text(randomEvery);
	}
	
	updateInfo();
	
	/* 	
		Arrow keys functionality for menu interaction
		 - Up and Down cycles through the interactions in the menu
		 - Left and Right cycles through the values
		 - Currently only works for boolean values
	*/
	
	var firstInteraction 	= 1; // number of first interaction
	var interactionMode 	= firstInteraction;	// current interaction mode
	var lastInteraction 	= $('.info>div').length; // number of last interaction = number of interactions in menu
	
	$(".info>div:eq("+(interactionMode - 1)+")").addClass('selected'); // visually select current interaction
	
	// Arrow keys interactions
	
	// Up and down - change interaction mode variable, remove and add visual selection in menu
	$(document).keydown(function(e) {
		switch(e.which) {
			
			case 38: // up - change interaction
				interactionMode = interactionMode > (firstInteraction) ? interactionMode - 1 : lastInteraction;
				$(".info>div").removeClass('selected');
				$(".info>div:eq("+(interactionMode - 1)+")").addClass('selected');
				break;
				
			case 40: // down - change interaction
				interactionMode = interactionMode < lastInteraction ? interactionMode + 1 : firstInteraction;
				$(".info>div").removeClass('selected');
				$(".info>div:eq("+(interactionMode - 1)+")").addClass('selected');
				break;
				
	// Left and right - change value
				
			case 37: // left - change boolean value
				interactionValue('left');
				break;
				
			case 39: // right - change boolean value
				interactionValue('right');
				break;
				
			default: return;
		}
		e.preventDefault();
	});
	
	// Change interaction value
	function interactionValue(dir) {
		let mode = $(".info>div:eq("+(interactionMode - 1)+")").attr('data');
		
		switch(mode) {
			case 'intFollowCursor':
				lockCursor = !lockCursor;
				break;
				
			case 'intRotationLock':
				lockRotation = !lockRotation;
				break;
				
			case 'intRotationSpeed':
				break;
				
			case 'intColors':
				if (dir === 'left') {
					currentColorMode--;
					if (currentColorMode === (firstColor - 1)) { currentColorMode = lastColor; }
				} else {
					currentColorMode++;
					if (currentColorMode === (lastColor + 1)) { currentColorMode = firstColor; }
				}
				
			case 'intIntervalLock':
				lockInterval = !lockInterval;
				break;
				
			case 'intInterval':
				break;
				
			case 'intAutodestruct':
				break;
				
			case 'intRandomRotation':
				randomRotation = !randomRotation;
				break;
				
			case 'intRandomInterval':
				randomInterval = !randomInterval;
				break;
				
			case 'intRandomLocation':
				randomLocation = !randomLocation;
				break;
				
			case 'intRandomColors':
				randomColors = !randomColors;
				break;
			
			default: return;
		}
	}
	
	// End of interaction menu and information functionality
	
	/** Mouse interactions **/
	
	// Mouse buttons interactivity
	$('.main').mousedown(function(event) {
		switch (event.which) {
			case 1: // lmb
				break;
			case 2: // mmb
				break;
			case 3: // rmb
				break;
			default:
				console.log('8-)');
		}
	});
	
	// Disable right click context menu
	$('.main').on('contextmenu', function(event){
        event.preventDefault();
    });
	
	// Mouse move interactivity
	$(document).mousemove(function(getCurrentPos){
		// Get coordinates
		var xCord = getCurrentPos.clientX;
		var yCord = getCurrentPos.clientY;

		// Calculate position in percentages
		var xPercent = Math.floor(xCord / $(window).width() * 100);
		var yPercent = Math.floor(yCord / $(window).height() * 100);
		
		// Only change values if position is not locked
		if (!lockCursor) {
			currentMouseX = xPercent;
			currentMouseY = yPercent;
		}
		
		// Call X and Y axis interaction functions
		xMousemove(xPercent);
		yMousemove(yPercent);
				
		updateInfo();
		
	});
	
	/** Todo: functionality to bind functions to X-Y axis functions instead of hardcoding them here **/
	// Mouse move function left-right
	function xMousemove(val) {
		rotationInteractivity(val);
	}
	
	// Mouse move function up-down
	function yMousemove(val) {
		intervalInteractivity(val);		
	}
	
	// Interval interactivity function
	function intervalInteractivity(val) {
		if (intervalMouseMode && !lockInterval) {
			interval = 0.05*(Math.pow(val,2));
			$("#intervalSlider").slider('value', val);
		}
	}
	
	// Rotation interactivity function
	function rotationInteractivity(val) {
		if (!lockRotation) {
			let speed;
			if (val < 49) {
				speed = 0.1 + 0.00023 * Math.pow(val, 3.32);
				rectAnimation = 'rotatingLeft '+speed.toFixed(1)+'s linear infinite';
				infoRotation = 'left ' + speed.toFixed(1) + 's';

			} else if (val > 51) {
				speed = -1.25 + 101.25 / Math.pow(2, ((val - 50) / 7.886));
				rectAnimation = 'rotatingRight '+speed.toFixed(1)+'s linear infinite';
				infoRotation = 'right ' + speed.toFixed(1) + 's';
			} else {
				rectAnimation = 'none';
				infoRotation = 'none';
			}
		}
	}
	
	/** Randomization functionality **/
	var randomEveryCounter 	= 0; // Counter to randomize again
	
	function randomizeInteractions() {
		
		// Randomizes the values every "randomEvery" times
		if (randomEveryCounter === 0) {
			randomEveryCounter = randomEvery;
		} else {
			randomEveryCounter--;
			return; // exits the function
		}
		
		let x;
		
		if (randomRotation) {
			x = Math.floor(Math.random() * 100);
			rotationInteractivity(x);
		}
		
		if (randomInterval) {
			x = Math.floor(Math.random() * 10);
			intervalInteractivity(x);
		}
		
		if (randomLocation) {
			currentMouseX = Math.floor(Math.random() * 100);
			currentMouseY = Math.floor(Math.random() * 100);
		}
		
		if (randomColors) {
			currentColorMode = Math.floor(Math.random() * lastColor) + firstColor;
		}
	}
		
	/** Color functionality **/
	
	// Function to get the correct color mode and information label
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
	
	// Random grayscale color
	function getGrayscale() { // 1
		var value = Math.random() * 0xFF | 0;
		var grayscale = (value << 16) | (value << 8) | value;
		var color = '#' + grayscale.toString(16);
		return color;
	}
	
	// Random color
	function getRandomColor() { // 2
		return '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
	}
	
	// Black to white to black loop a.k.a. periodic grayscale
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
	
	// Random background picture (currently randommly cycles between "pic1.jpg" and "pic2.jpg" from root
	function getRandomBackground() {
		let a = Math.floor(Math.random() * 100) + 1;
		let b = Math.floor(Math.random() * 100) + 1;
		return ("url('img/pic"+(Math.random() < 0.5 ? 1 : 2)+".jpg') "+a+"% "+b+"%");
	}
	
	/** End of color functionality **/
	
	/** Initiate menu sliders and functionality **/
	
	// Interval slider
	$( "#intervalSlider" ).slider({
		range: "min",
		value: interval,
		min: 1,
		max: 100,
		slide: function( event, ui ) {
			interval = 0.05*(Math.pow(ui.value,2));
			updateInfo();
		}
    });
	
	$("#intervalModeTick").removeAttr('checked');
	
	$("#intervalModeTick").change(function() {
		intervalMouseMode = !this.checked;
	});
	
	// Animation speed slider
	$( "#animationSlider" ).slider({
		range: "min",
		value: destructTimer,
		min: 0.5,
		max: 5,
		slide: function( event, ui ) {
			animationTimer = ui.value;
			updateInfo();
		}
    });
	
	// Self destruct timer slider
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
	
	// Random interactivity slider
	$( "#randomEverySlider" ).slider({
		range: "min",
		value: randomEvery,
		min: 1,
		max: 50,
		slide: function( event, ui ) {
			randomEvery = ui.value;
			updateInfo();
		}
    });
	
	/** End of menu sliders **/
	
	/** Main logic **/
	
	// Move current and create a new object
	$.fn.objectJob = function() {
	  
		let obj = $(this[0]); // Current object handle

		// Animate to this position & size
		obj.css({'left': '-=25%'});
		obj.css({'top': '-=25%'});
		obj.css({'width': '+=150%'});
		obj.css({'height': '+=150%'});
		
		let cns = this[0].className;
		let objColor = getCurrentColor();
		
		// Create a new object
		$('<div />', {"class": cns})									// clone classes				
			.css({'background' : objColor})								// color
			.css('-webkit-animation', rectAnimation)					// rotation
			.css({left: currentMouseX+'%', top: currentMouseY+'%'})		// position
			.css('transition', 'all '+animationTimer+'s ease-in-out')	// animation speed
			.appendTo('.main');										
		
		obj.addClass('removal');
		setTimeout(function() {
			obj.remove();
		}, destructTimer);

		return this;
	}; 
	
	// Main loop for object generation
	function mainLoop() {
		setTimeout(function() {
			randomizeInteractions();  // randomize object settings
			
			$(".fullrect").each(function() {
				if (! $(this).hasClass('removal')) {
					$(this).objectJob();
				}
			});
			mainLoop(); // loop the function
		}, interval);	// loop interval in ms
	}
	
	// START
	mainLoop();
	
	/** Main logic end **/
	
});