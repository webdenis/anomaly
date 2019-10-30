$(function() {
	
	/**
		@name Anomaly
		@version 0.9
		@github https://github.com/webdenis/anomaly
	**/
	
	/**	Default interaction variables **/
	var menu 				= true;		//	Show interaction & information menu
	
	var loadDemoPresets		= true;		//	Will load a demo preset if menu starts with 0 presets
	
	var fullStop			= false;	//	Stop objects from generating
	
	var stopOnLowFPS		= true;		//	Stops object generation
	var minFps				= 10;		// 	if FPS drops below this vlaue
	
	var interval 			= 500; 		// 	Time between object generation
	
	var color 				= 0;		// 	Starting color
										
	var currentColorMode 	= 1;		/*	Currently used color mode
											1 - random grayscale
											2 - random non grayscale
											3 - black to white to black loop
											4 - two pictures backgrounds		*/
										
	var firstColor 			= 1; 		//	Number of first
	var lastColor 			= 4;		//	and last color	
	
	var transform			= 'none';	// 	Generated CSS string for object transform
	
	var transformMode		= 1;		/*	Current transform mode
											1 - Rotation
											2 - Skew X
											3 - Skew Y
											4 - Skew XY							*/
										
	var firstTransformMode	= 1;		// Number of first
	var lastTransformMode	= 4;		// and last transform mode
	
	var animationTimer		= 1;		// 	Animation time in seconds
	
	var destructTimer 		= 1000; 	// 	Timer for object auto-destruction
	
	var currentMouseX 		= 50;		// 	Current Mouse X position in percentages
	var currentMouseY 		= 50;		//				  Y
	
	var intervalMouseMode 	= true;  	// 	Mouse affecting interval in Y scale 			->(RMB)<-
	var transformMouseMode	= true;		//	Mouse affecting transform in X scale			->(MMB)<-
	
	var lockCursor 			= false;	// 	Generated objects appear at cursor position		->(LMB)<-	
										// 	Newly generated objects:
	var randomTransform		= false;	// 	- Random transformation mode
	var randomTransformVars	= false;	//	- Random transformation direction / speed
	var randomInterval 		= false;	//	- Appear within random intervals
	var randomLocation 		= false;	//	- Appear in random position
	var randomColors 		= false;	//	- Use random color mode
	var randomAnimSpeed		= false;	// 	- Use random css animation speed
	var randomDestructTimer = false; 	// 	- Auto-destruct after random time
	
	var randomEvery 		= 1;		//	How many objects are generated between randomizations
	
	/** Min & Max **/	
	var animSpeedMinValue	= 0.5;
	var animSpeedMaxValue	= 7.5;
	var animSpeedStep		= 0.5;
	
	var destructMinValue	= 100;
	var destructMaxValue	= 7500;
	var destructStep		= 100;
	
	var randomEveryMinValue = 1;
	var randomEveryMaxValue = 250;
	var randomEveryStep		= 1;
	
	// Random min max
	var randomIntervalMin	= 0;		// Minimum and 
	var randomIntervalMax	= 75;		// maximum values of random interval in %
	
	var randomDestructMin	= 100;
	var randomDestructMax	= 3000;		// limit random destruct for performance

	// End of default interaction variables
	
	/** Interaction menu and information functionality **/
	
	// FPS + Object Counter // https://www.growingwiththeweb.com/2017/12/fast-simple-js-fps-counter.html
	const times = [];
	let fps, objectCount;

	function refreshLoop() {
	  window.requestAnimationFrame(() => {
		const now = performance.now();
		while (times.length > 0 && times[0] <= now - 1000) {
		  times.shift();
		}
		times.push(now);
		fps = times.length;
		objectCount = $('.fullrect').length;
		refreshLoop();
	  });
	}

	refreshLoop();
	
	if (!menu) {
		$(".info").css('display', 'none');
	}
		
	var infoTransform = 'none';
	var infoTransformMode;
	var infoColorMode;
	var intervalValue = 0;
	var transformValue = 50;
	
	function ONorOFF(val) {
		let x = val ? 'ON' : 'OFF';
		return '<span class="'+x+'">'+x+'</span>';
	}
		
	function updateInfo() {
		$(".fullStop").css('display', (fullStop ? 'block' : 'none'));
		if (menu) { // only update if menu is visible
			$("#infoShowMenu").html(ONorOFF(menu));
			$("#infoStop").html(ONorOFF(fullStop));
			$("#infoFpsStop").html(ONorOFF(stopOnLowFPS));
			$("#infoColorMode").text(infoColorMode);
			
			$("#infoCursorPosition").html(ONorOFF(!lockCursor));
			$("#infoPosition").text('X '+currentMouseX+'%, Y '+currentMouseY+'%');
			
			$("#infoIntervalMouseMode").html(ONorOFF(intervalMouseMode));
			$("#infoInterval").text(interval.toFixed(0) + 'ms');
			
			if ($("#intervalSlider").hasClass('ui-slider')) {
				$("#intervalSlider").slider('value', intervalValue);
			}
			
			$("#infoTransformMouseMode").html(ONorOFF(transformMouseMode));
			transformInteractivity(transformValue);
			$("#infoTransformMode").text(infoTransformMode);
			$("#infoTransformVars").text(infoTransform);
			
			if ($("#transformSlider").hasClass('ui-slider')) {
				$("#transformSlider").slider('value', transformValue);
			}
			
			$("#infoAnimationSpeed").text(animationTimer);
			
			if ($("#animationSlider").hasClass('ui-slider')) {
				$("#animationSlider").slider('value', animationTimer);
			}
			
			$("#infoDestruct").text(destructTimer + 'ms');
			
			if ($("#destructSlider").hasClass('ui-slider')) {
				$("#destructSlider").slider('value', destructTimer);
			}
			
			$("#infoRandomTransform").html(ONorOFF(randomTransform));
			$("#infoRandomTransformVars").html(ONorOFF(randomTransformVars));
			$("#infoRandomInterval").html(ONorOFF(randomInterval));
			$("#infoRandomLocation").html(ONorOFF(randomLocation));
			$("#infoRandomColors").html(ONorOFF(randomColors));
			$("#infoRandomAnimationSpeed").html(ONorOFF(randomAnimSpeed));
			$("#infoRandomDestructTimer").html(ONorOFF(randomDestructTimer));
			$("#infoRandomEvery").text(randomEvery + ' ('+randomEveryCounter+') ');
			
			if ($("#randomEverySlider").hasClass('ui-slider')) {
				$("#randomEverySlider").slider('value', randomEvery);
			}
			
			let fpsH = $("#fps").addClass('red');
			fpsH.text(fps);
			if (fps < 30) { fpsH.addClass('red'); } else { fpsH.removeClass('red'); };
			$("#objectCount").text(objectCount);
		}
	}

	/* 	
		Arrow keys functionality for menu interaction
		 - Up and Down cycles through the interactions in the menu
		 - Left and Right cycles through the values
		 - Currently only works for boolean values
	*/
	
	var firstInteraction 	= 1; // number of first interaction
	var interactionMode 	= firstInteraction;	// current interaction mode
	var lastInteraction 	= $('.info>div').length; // number of last interaction = number of interactions in menu
	$(".info>div:eq("+(interactionMode - 1)+")").addClass('selected')
	
	// Allow menu option selection with left click
	$('.info>div').mousedown(function(e) {
		if (e.which === 1) {
			interactionMode = $('.info>div').index($(this)) + 1;
			$(".info>div").removeClass('selected');
			$(".info>div:eq("+(interactionMode - 1)+")").addClass('selected'); // visually select current interaction
		}
	});
	
	// Allow option value change with mousewheel
	$('body').on('wheel', function(e) {
		if (e.originalEvent.deltaY < 0) { // up
			interactionValue('right');
		} else { // down
			interactionValue('left');
		}
	});
	
	// Arrow keys interactions
	
	// Up and down - change interaction mode variable, remove and add visual selection in menu
	// Left and right - change value
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

			case 37: // left - change boolean value
				interactionValue('left');
				break;
				
			case 39: // right - change boolean value
				interactionValue('right');
				break;
				
			case 36: // HOME - menu ON
				menu = !menu;
				$(".info").toggle();
				break;
			
			case 35: // END - toggle generation
				fullStop = !fullStop;
				if (!fullStop) {
					mainLoop();
				}
				
			default: return;
		}
		e.preventDefault();
		e.stopPropagation();
		return false;
	});
	
	// Stop message click = start
	$(".fullStop").click(function() {
		fullStop = false;
		mainLoop();
	});
	
	// Return change if x is correctly between a and b
	function changeIfInBetween(x, a, b, change) {
		if (change < 0) {
			return (x > a && x <= b) ? change : 0;
		} else {
			return (x >= a && x < b) ? change : 0;
		}
	}
	
	// Change interaction value
	function interactionValue(dir) {
		let mode = $(".info>div:eq("+(interactionMode - 1)+")").attr('data');
		
		// Sliders
		let sliderHandle = $(".info>div:eq("+(interactionMode - 1)+")").find('div.slider');
		let containsSlider = sliderHandle.length !== 0;
		
		if (containsSlider) {
			let change = (dir === 'right' ? 1 : -1) * sliderHandle.slider('option', 'step');
			let sMin = sliderHandle.slider('option', 'min');
			let sMax = sliderHandle.slider('option', 'max');
			
			switch(mode) {
				case 'intInterval':
					intervalValue += changeIfInBetween(intervalValue, sMin, sMax, change);
					intervalInteractivity(intervalValue);
					break;
				case 'intTransformVars':
					transformValue += changeIfInBetween(transformValue, sMin, sMax, change);
					transformInteractivity(transformValue);
					break;
				case 'intAnimationSpeed':
					animationTimer += changeIfInBetween(animationTimer, sMin, sMax, change);
					break;	
				case 'intAutodestruct':
					destructTimer += changeIfInBetween(destructTimer, sMin, sMax, change);
					break;
				case 'intRandomEvery':
					randomEvery += changeIfInBetween(randomEvery, sMin, sMax, change);
					break;
				default:
					return;
			}
			
			return;
		}
		
		// Booleans
		switch(mode) {
			case 'intMenu':
				menu = !menu;
				
				$(".info").css('display', menu ? 'block' : 'none');
				break;
			
			case 'intStop':
				fullStop = !fullStop;
				
				if (!fullStop) {
					mainLoop();
				}
				break;
				
			case 'intFpsStop':
				stopOnLowFPS = !stopOnLowFPS;
				break;
			
			case 'intFollowCursor':
				lockCursor = !lockCursor;
				break;
				
			case 'intTransformMouseMode':
				transformMouseMode = !transformMouseMode;
				break;
				
			case 'intTransformMode':
				if (dir === 'left') {
					transformMode--;
					if (transformMode === (firstTransformMode - 1)) { transformMode = lastTransformMode; }
				} else {
					transformMode++;
					if (transformMode === (lastTransformMode + 1)) { transformMode = firstTransformMode; }
				}
				transformInteractivity(transformValue);
				break;
				
			case 'intColors':
				if (dir === 'left') {
					currentColorMode--;
					if (currentColorMode === (firstColor - 1)) { currentColorMode = lastColor; }
				} else {
					currentColorMode++;
					if (currentColorMode === (lastColor + 1)) { currentColorMode = firstColor; }
				}
				getCurrentColor();
				break;
				
			case 'intIntervalMouseMode':
				intervalMouseMode = !intervalMouseMode;
				break;
								
			case 'intRandomTransform':
				randomTransform = !randomTransform;
				break;
				
			case 'intRandomTransformVars':
				randomTransformVars = !randomTransformVars;
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
				
			case 'intRandomAnimationSpeed':
				randomAnimSpeed = !randomAnimSpeed;
				break;
				
			case 'intRandomDestructTimer':
				randomDestructTimer = !randomDestructTimer;
				break;
			
			default: return;
		}

	}
	
	// End of interaction menu and information functionality
	
	/** Presets functionality **/
		
	// Initialize variables
	var demoPresetJSON = '[{"menu":true,"fullStop":false,"currentColorMode":3,"lockCursor":true,"interval":273.8,"intervalMouseMode":false,"transformMouseMode":false,"transformMode":1,"transformValue":5,"animationTimer":7.5,"destructTimer":2300,"currentMouseX":50,"currentMouseY":48,"randomTransform":false,"randomTransformVars":false,"randomInterval":true,"randomLocation":false,"randomColors":true,"randomAnimSpeed":false,"randomDestructTimer":false,"randomEvery":10},{"menu":true,"fullStop":false,"currentColorMode":3,"lockCursor":false,"interval":4.802000000000001,"intervalMouseMode":false,"transformMouseMode":false,"transformMode":1,"transformValue":10,"animationTimer":4,"destructTimer":2500,"currentMouseX":92,"currentMouseY":95,"randomTransform":false,"randomTransformVars":false,"randomInterval":false,"randomLocation":false,"randomColors":false,"randomAnimSpeed":false,"randomDestructTimer":false,"randomEvery":1}]';
	
	var savedPresets = loadDemoPresets ? JSON.parse(demoPresetJSON) : []; // array of saved presets
	var selectedPresetNumber = 0; // store current preset number (not array positions!)
	
	// Initialize cookies, empty or saved
	if (Cookies.get('savedPresets')) {
		let parsed = JSON.parse(Cookies.get('savedPresets'));
		savedPresets = 
			(parsed.length === 0 && loadDemoPresets) ? JSON.parse(demoPresetJSON) : parsed;
	}
	
	updatePresetBoxes();
	
	// Save cookies
	function savePresetCookies() {
		Cookies.set('savedPresets', JSON.stringify(savedPresets));
	}
	
	// Appends preset array with a new preset
	function addPreset(preset) {
		savedPresets.push(preset);
		savePresetCookies();
	}
	
	// Removes preset from array at given position
	function removePreset(id) {
		savedPresets.splice(id - 1, 1);
		savePresetCookies();
	}
	
	// Generate preset from current values
	function generatePreset() {
		return {
			'menu' : menu,
			'fullStop' : fullStop,
			'currentColorMode' : currentColorMode,
			'lockCursor' : lockCursor,
			
			'interval' : interval,
			'intervalMouseMode' : intervalMouseMode,

			'transformMouseMode' : transformMouseMode,
			'transformMode' : transformMode,
			'transformValue' : transformValue,
			
			'animationTimer' : animationTimer,
			'destructTimer' : destructTimer,
			
			'currentMouseX' : currentMouseX,
			'currentMouseY' : currentMouseY,
			
			'randomTransform' : randomTransform,
			'randomTransformVars' : randomTransformVars,
			'randomInterval' : randomInterval,
			'randomLocation' : randomLocation,
			'randomColors' : randomColors,
			'randomAnimSpeed' : randomAnimSpeed,
			'randomDestructTimer' : randomDestructTimer,
			'randomEvery' : randomEvery
		};
	}
	
	// Apply preset array to values
	function applyPreset(preset) {
		menu = preset['menu'];
		fullStop = preset['fullStop'];
		currentColorMode = preset['currentColorMode'];
		lockCursor = preset['lockCursor'];
		 
		intervalMouseMode = preset['intervalMouseMode'];
		intervalInteractivity(preset['interval']); // sets interval & intervalValue
		 
		transformMouseMode = preset['transformMouseMode'];
		transformMode = preset['transformMode'];
		transformInteractivity(preset['transformValue']); // sets transform & transfromValue
			 
		animationTimer = preset['animationTimer'];
		destructTimer = preset['destructTimer'];
		
		currentMouseX = preset['currentMouseX'];
		currentMouseY = preset['currentMouseY'];
			   
		randomTransform = preset['randomTransform'];
		randomTransformVars = preset['randomTransformVars'];
		randomInterval = preset['randomInterval'];
		randomLocation = preset['randomLocation'];
		randomColors = preset['randomColors'];
		randomAnimSpeed = preset['randomAnimSpeed'];
		randomDestructTimer = preset['randomDestructTimer'];
		randomEvery = preset['randomEvery'];
	}
		
	// Preset click event & call apply
	$('#presetBoxes').on('click', '.preset', function() {
		selectedPresetNumber = $(this).text();
		$('.removePreset').removeClass('disabled');
		$("#presetBoxes>span").removeClass('selected');
		$("#presetBoxes>span:eq("+(selectedPresetNumber - 1)+")").addClass('selected');
		
		applyPreset(savedPresets[selectedPresetNumber - 1]);
	});
	
	// Add preset button
	$('.addPreset').click(function() {
		addPreset(generatePreset());
		selectedPresetNumber = savedPresets.length;
		updatePresetBoxes();
		return false;
	});
	
	// Remove currently selected preset button
	$('.removePreset').click(function() {
		if (selectedPresetNumber === 0) {
			return;
		}
		removePreset(selectedPresetNumber);
		selectedPresetNumber = 0;
		updatePresetBoxes();
		return false;
	});
	
	// Update presets container
	function updatePresetBoxes() {
		let boxContainer = $('#presetBoxes');
		boxContainer.empty(); // clear
		
		// Generate text or boxes
		if (savedPresets.length === 0) {
			boxContainer.text('no saved presets');
		} else {
			$.each(savedPresets, function(i, obj) {
				boxContainer.append('<span class="preset '+(selectedPresetNumber === (i+1) ? 'selected' : '')+'">'+(i+1)+'</span>');
			});
		}
		
		// Visually disable remove preset button
		if (selectedPresetNumber === 0) {
			$('.removePreset').addClass('disabled');
		} else {
			$('.removePreset').removeClass('disabled');
		}
	}
	
	// End of presets functionality
	
	/** Mouse interactions **/
	
	// Mouse buttons interactivity
	$('.main').mousedown(function(event) {
		switch (event.which) {
			case 1: // lmb
				lockCursor = !lockCursor;					// Follow cursor
				break;
			case 2: // mmb
				transformMouseMode = !transformMouseMode;	// Mouse affects transform
				event.preventDefault();
				break;
			case 3: // rmb
				intervalMouseMode = !intervalMouseMode;		// Mouse affects interval
				break;
			default:
				console.log('8-)');
		}
	});
	
	// Disable right click context menu
	$('.main, .info').on('contextmenu', function(event){
        event.preventDefault();
    });
	
	// Mouse move interactivity
	$(document).mousemove(function(e){
		// Get coordinates
		var xCord = e.clientX;
		var yCord = e.clientY;

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
	});
	
	// Mouse move function left-right
	function xMousemove(val) {
		if (transformMouseMode)
			transformInteractivity(val);
	}
	
	// Mouse move function up-down
	function yMousemove(val) {
		if (intervalMouseMode)
			intervalInteractivity(val);		
	}
	
	/** Interval and Transform formulas and interaction functions **/
	
	// Interval formula function
	function intervalFormula(val) {
		return 0.05*(Math.pow(val,2));
	}
	
	// Interval interactivity function
	function intervalInteractivity(val) {
		intervalValue = val;
		interval = intervalFormula(val);
	}
	
	// Transform speed formula function
	function transformFormula(val) {
		let speed;
		if (val < 49) {
			speed = 0.1 + 0.00023 * Math.pow(val, 3.32);
		}
		if (val > 51) {
			speed = -1.15 + 101.25 / Math.pow(2, ((val - 50) / 7.886));
		}
		return speed;
	}
	
	// Transform interactivity function
	function transformInteractivity(val) {
		
		switch(transformMode) {
			case 1:
				infoTransformMode = 'rotate';
				break;
			case 2:
				infoTransformMode = 'skewX';
				break;
			case 3:
				infoTransformMode = 'skewY';
				break;
			case 4:
				infoTransformMode = 'skewXY';
				break;
			default:
				infoTransformMode = 'rotate';
		}
		
		transformValue = val;
		let speed;
		if (val < 49) {
			speed = transformFormula(val);
			transform = infoTransformMode+'Left '+speed.toFixed(1)+'s linear infinite';
			infoTransform = 'left ' + speed.toFixed(1) + 's';

		} else if (val > 51) {
			speed = transformFormula(val);
			transform = infoTransformMode+'Right '+speed.toFixed(1)+'s linear infinite';
			infoTransform = 'right ' + speed.toFixed(1) + 's';
		} else {
			transform = 'none';
			infoTransform = 'N/A';
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
		
		if (randomTransform) { // random transform mode
			transformMode = Math.floor(Math.random() * lastTransformMode) + firstTransformMode;
			transformInteractivity(transformValue);
		}
		
		if (randomTransformVars) {
			x = Math.floor(Math.random() * 100);
			transformInteractivity(x);
		}
		
		if (randomInterval) {
			x = Math.floor(Math.random() * randomIntervalMax) + randomIntervalMin;
			intervalInteractivity(x);
		}
		
		if (randomLocation) {
			currentMouseX = Math.floor(Math.random() * 100);
			currentMouseY = Math.floor(Math.random() * 100);
		}
		
		if (randomColors) {
			currentColorMode = Math.floor(Math.random() * lastColor) + firstColor;
		}
		
		if (randomAnimSpeed) {
			animationTimer = Math.random() * animSpeedMaxValue + animSpeedMinValue;
			animationTimer = animationTimer.toFixed(1);
		}
		
		if (randomDestructTimer) {
			destructTimer = Math.floor(Math.random() * randomDestructMax) + randomDestructMin;
		}
		
	}
	
	$('.toggleRandom').click(function() {
		let bool = $(this).text() === 'ON' ? true : false;
		randomColors = randomTransform = randomTransformVars = randomInterval = 
			randomLocation = randomAnimSpeed = randomDestructTimer = bool;
	});
		
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
				infoColorMode = 'random non-gray';
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
	
	$.prototype.slider_old = $.prototype.slider;
	$.prototype.slider = function()
	{
		var result = $.prototype.slider_old.apply(this, arguments);
		this.find(".ui-slider-handle").unbind("keydown"); // disable keyboard actions
		return result;
	}
	
	// Interval slider
	$( "#intervalSlider" ).slider({
		range: "min",
		value: interval,
		min: 1,
		max: 100,
		step: 1,
		slide: function( event, ui ) {
			intervalInteractivity(ui.value);
		}
    });

	// Transform slider
	$( "#transformSlider" ).slider({
		range: "min",
		value: transformValue,
		min: 1,
		max: 100,
		step: 1,
		slide: function( event, ui ) {
			transformInteractivity(ui.value);
		}
    });
	
	// Animation speed slider
	$( "#animationSlider" ).slider({
		range: "min",
		value: animationTimer,
		min: animSpeedMinValue,
		max: animSpeedMaxValue,
		step: animSpeedStep,
		slide: function( event, ui ) {
			animationTimer = ui.value;
		}
    });
	
	// Self destruct timer slider
	$( "#destructSlider" ).slider({
		range: "min",
		value: destructTimer,
		min: destructMinValue,
		max: destructMaxValue,
		step: destructStep,
		slide: function( event, ui ) {
			destructTimer = ui.value;
		}
    });
	
	// Random interactivity slider
	$( "#randomEverySlider" ).slider({
		range: "min",
		value: randomEvery,
		min: randomEveryMinValue,
		max: randomEveryMaxValue,
		step: randomEveryStep,
		slide: function( event, ui ) {
			randomEvery = ui.value;
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
			.css('-webkit-animation', transform)						// transform
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
			if (!fullStop) {	// if generation not stopped
				mainLoop(); 	// loop the function
			}

		}, interval);	// loop interval in ms
	}
	
	// START
	mainLoop();
	
	setInterval(function() {
		updateInfo();
	}, 100);
	
	// Stop on low fps
	setTimeout(function() {
		setInterval(function() {
			if (fps < minFps && stopOnLowFPS) {
				fullStop = true;
			}
		}, 1000);
	}, 2500);
	
	/** Main logic end **/
	
});