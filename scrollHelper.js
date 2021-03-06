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
			showUp : false,
			trigger : 'once'
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

		if ( settings.trigger ) {
			var triggerResult = settings.trigger;			
		}

		function triggerResultF() {
			if(triggerResult !== 'always') {
				var triggerOnce = true;
				return triggerOnce;
			}
		};

		function pageCalculate() {
			var PageHeight = $('html').outerHeight();

			//Resize
			$(window).resize(function(){
				PageHeight = $('html').outerHeight();
			});

			return PageHeight;
		};

		function WinCalculate() {
			var WinHeight = $(window).outerHeight();

			//Resize
			$(window).resize(function(){
				WinHeight = $(window).outerHeight();
			});

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
					$(e).addClass('scrollTo scrollHelperSection'+i);
					// addClass
				});

				// First Load
				var num = 0;
				$('.scrollHelper').on('click', function(){
					if($(this).hasClass('showup')) {
						num = 0;

						$('.scrollTo').removeClass('scrolled');
						$('html, body').animate({
							scrollTop: 0
						});

					} else {
						num = num + 1;
						$('.scrollTo').eq(num).addClass('scrolled');
						$('html, body').animate({
							scrollTop: $('.scrollTo').eq(num).offset().top
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
				var scrollAbleArea = pageCalculate() - WinCalculate();
				
				// First Load

				if(pagePosition >= ( scrollAbleArea ) ) {
					$('.scrollHelper').html('Scroll Up').addClass('showup');
				} else{
					$('.scrollHelper').html('Scroll Down').removeClass('showup');
				}

				// When Scroll
				
				$(window).scroll(function(){
					pagePosition = $(window).scrollTop();

					//console.log(scrollAbleArea);

					if(pagePosition >= ( pageCalculate() - WinCalculate() ) ) {
						$('.scrollHelper').html('Scroll Up').addClass('showup');
					} else{
						$('.scrollHelper').html('Scroll Down').removeClass('showup');
					}				
				});

			}

		};
		
		// Init
		triggerResultF();
		createElem();
		waitTimeF();
		invisibleonScrollF();
		jumpToF();
		showUpF();
					
	}
	
	return false;
		
}(jQuery));	