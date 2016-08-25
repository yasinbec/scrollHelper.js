// ScrollHelper v1.0.0 for jQuery
// =============
// Author: Ali Beceren
// Created: 09/24/2016
// Website: http://www.jenaldesign.com
// Description: Jenal Design 

(function($) {

	$.fn.scrollHelper = function(options) {
				
		// Settings
		var settings = $.extend({
			waitTime  : 3000,
			invisibleonScroll  : false,
			jumpTo  : false,
			showUp : false
		}, options);

			
		if ( settings.waitTime ) {
			var waitTimeResult = settings.waitTime;			
		}

		if ( settings.invisibleonScroll ) {
			var invisibleonScrollResult = settings.invisibleonScroll;			
		} else {
			var invisibleonScrollResult = false;			
		}

		if ( settings.jumpTo ) {
			var jumpToResult = settings.jumpTo;
		} else {
			var jumpToResult = false;
		}

		if ( settings.showUp ) {
			var showUpResult = settings.showUp;
		} else {
			var showUpResult = false;
		}

		function pageCalculate() {
			var WinHeight = $('html').outerHeight();

			//add resize function

			return WinHeight;
		};

	 	function createElem() {
			var button = '<div class="scrollHelper">Scroll Down</div>';
			$(button).insertAfter('body');
		};

		function waitTimeF() {
			setTimeout(function(){
				$('.scrollHelper').fadeIn();
			},waitTimeResult);
		};

	    function invisibleonScrollF() {

	    	if(invisibleonScrollResult) {
	    		$(window).scroll(function(){
	    			$('.scrollHelper').fadeOut();

					clearTimeout( $.data( this, "scrollCheck" ) );
	                $.data( this, "scrollCheck", setTimeout(function() {
	                    $('.scrollHelper').fadeIn();
	                }, 250) );

	    		});
	    	}

		};

		function jumpToF() {

			if(jumpToResult !== false) {
				$.each($(jumpToResult), function(i,e){
					$(e).addClass('scrollHelperSection'+i);

					// addClass



				});




				$('.scrollHelper').on('click', function(){

					if($(this).hasClass('showup')) {

						$('html, body').animate({
							scrollTop: $('.scrollHelperSection4').offset().top
						});

					} else {

						$('html, body').animate({
							scrollTop: $('.scrollHelperSection4').offset().top
						});
					}

				});

			}

		};

		function showUpF() {

			if(showUpResult !== false) {
				var pagePosition = $(window).scrollTop();
				var breakPoint = $(showUpResult).offset().top;

				// First Load

				if(pagePosition >= breakPoint) {
					$('.scrollHelper').html('Scroll Up').addClass('showup');
				} else{
					$('.scrollHelper').html('Scroll Down').removeClass('showup');
				}

				// When Scroll

				$(window).scroll(function(){
					pagePosition = $(window).scrollTop();

					if(pagePosition >= breakPoint) {
						$('.scrollHelper').html('Scroll Up').addClass('showup');
					} else{
						$('.scrollHelper').html('Scroll Down').removeClass('showup');
					}				
				});

			} else {

				var pagePosition = $(window).scrollTop();

				// First Load

				if(pagePosition > pageCalculate()) {
					$('.scrollHelper').html('Scroll Up').addClass('showup');
				} else{
					$('.scrollHelper').html('Scroll Down').removeClass('showup');
				}

				// When Scroll
				
				$(window).scroll(function(){
					pagePosition = $(window).scrollTop();

					console.log(pagePosition + ' - ' +pageCalculate());

					if(pagePosition >= pageCalculate()) {
						$('.scrollHelper').html('Scroll Up').addClass('showup');
					} else{
						$('.scrollHelper').html('Scroll Down').removeClass('showup');
					}				
				});

			}

		};
		
		// Init
		createElem();
		waitTimeF();
		invisibleonScrollF();
		jumpToF();
		showUpF();
					
	}
	
	return false;
		
}(jQuery));	