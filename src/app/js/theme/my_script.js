(function($){

	$(document).ready(function(){

		$('.nav__primary>ul>li>a').each(function(){
	        var $this = $(this),
	            txt = $this.text();
		        $this.html('<div><span>'+ txt +'</span></div><div><span>'+ txt +'</span></div>');
		});


		$('.banner-btn').find('a').addClass('btn-primary');

		$('.comment-reply-link').addClass('btn btn-primary');

		$('.btn-primary, .btn-link').each(function(){
	        var $this = $(this),
	            txt = $this.text();
		        $this.html('<div><i>'+ txt +'</i></div>');
		});

		$('.type_box_2').each(function(){
			_this = $(this),
			_this.find('.btn-align').insertBefore(_this.find('.service-box_txt'));
			_this.find('a').removeClass('btn-primary btn-inverse btn-normal');
		});

		$('.team1').each(function(){
			_this = $(this).parent();
			_this.append('<div class="cont_banner"></div>');
			_this.find('.team1').appendTo(_this.find('.cont_banner'));
		});


		addEventsFunction();


	 	$(window).resize(
		   function(){
		    if($(window).width()< 767){
		    	$('body').find('section').removeClass('lazy-load-box');
		    	$('body').find('section').removeClass('effect-slideup');
		    	$('body').find('section').removeClass('effect-slidedown');
		    	$('body').find('section').removeClass('effect-slidefromleft');
		    	$('body').find('section').removeClass('effect-slidefromright');
		    	$('body').find('section').removeClass('effect-zoomin');
		    	$('body').find('section').removeClass('effect-zoomout');
		    	$('body').find('section').removeClass('effect-rotate');
		    	$('body').find('section').removeClass('effect-skew');
		    	$('body').find('section').removeClass('effect-fade');
		    }

				
			    	if($(window).width()<1400){
				    	$('.cont_banner').width($(window).width());
					    $('.cont_banner').css({width: $(window).width(), "margin-left": ($(window).width()/-2)});
					    var width_1 = $(window).width()/2 -10;
					    $('.cont_banner .team1>li').css({"width": width_1, "max-width": width_1});
						    if($(window).width()<700){
						    	$('.cont_banner').width($(window).width());
							    $('.cont_banner').css({width: $(window).width(), "margin-left": ($(window).width()/-2)});
							    var width_1 = $(window).width()/1 -10;
							    $('.cont_banner .team1>li').css({"width": width_1, "max-width": width_1});
							}else{

							}

					}else{
						$('.cont_banner').width($(window).width());
					    $('.cont_banner').css({width: $(window).width(), "margin-left": ($(window).width()/-2)});
					    var width_1 = $(window).width()/4 -10;
					    $('.cont_banner .team1>li').css({"width": width_1, "max-width": width_1});
					}

					$('.cherry-fixed-layout').each(function(){


						if($(window).width()>1210){
							$('.cont_banner').css({"max-width": 1210, "margin-left": (1210/-2)});
							var width_1 = 1210/2 -10;
					    	$('.cont_banner .team1>li').css({"width": width_1, "max-width": width_1});
							//$('.cont_banner .banner_list>li>.featured-thumbnail>a img').css({"max-width": (1210/4), "max-width": (1210/4)});

						}else{
							
						}

					});



		   }

		).trigger('resize');


	});


    function addEventsFunction(){
		$(document).on('scroll', function() {

			setInterval(function () {

					if ( $("div").hasClass("isStuck") ) {
						$(".menu_bg").addClass('act_1');
					}else{
						$(".menu_bg").removeClass('act_1');
					}
			}, 500);

		}).trigger('scroll');
	}


	more_btnFunction();

	function more_btnFunction(){
		 $('.parallax-slider .btn-primary').each(function(){
	        var $this = $(this),
            txt = $this.text();
	        $this.html('<div><i>'+ txt +'</i></div>');
		});
	}

	
 
})(jQuery);