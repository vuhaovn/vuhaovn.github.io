;(function($){
"use strict";

	var
		$nav = null,
		$btnNav = null,
		$btnWork = null,
		$bgHover = null,
		$btnMore = null,
		$itemWork = null,
		$listWork = null,

		$window,
		winHeight,

		windowPC = 975, // 992 - 17
		winWidth = 0;

	function init(){
		$listWork = $("#work .list_work");
		$btnWork = $("#work .list_button a");
		$bgHover = $("#work .hover");
		$itemWork = $("#work .work_item");
		$btnNav = $(".btn_menu");
		$nav = $("nav");
		$btnMore = $(".show_more a");
		$window = $(window);
		
		work();
		smooth();
  	revealOnScroll();
		$window.on("scroll", function() {
			nav();
			revealOnScroll();
		});

		$("html").niceScroll({
			cursorwidth:"10px",
			zindex:"1000"
		});
	}

	function nav(){
		var
			workPosition = $("#work").offset().top,
			aboutPosition = $("#about_us").offset().top,
			contactPosition = $("#contact").offset().top,
			scrollPosition = $window.scrollTop();
		$("nav a").each(function(index) {
			var
				$hrefElement = $( $(this).attr("href") ),
				len = $hrefElement.length;
			if( len ) {
				var position = $hrefElement.position();
				if( position.top <= scrollPosition && position.top + $hrefElement.outerHeight() > scrollPosition ) {
					$("nav ul li a").removeClass("active");
					$(this).addClass("active");
				} else {
					$(this).removeClass("active");
				}
			}
		});

		if( scrollPosition > 300) {
			$nav.addClass("scroll");
		} else {
			$nav.removeClass("scroll");
		}

		if( scrollPosition >= workPosition && scrollPosition < aboutPosition ) {
			$nav.removeClass("green");
			$nav.addClass("blue");
		} else if( scrollPosition >= aboutPosition && scrollPosition < contactPosition ) {
			$nav.removeClass("blue");
			$nav.addClass("green");
		} else if( scrollPosition >= contactPosition ) {
			$nav.removeClass("blue green");
			$(".social li").addClass("run");
		} else {
			$nav.removeClass("blue green");
			$(".social li").removeClass("run");
		}

	}

	function work(){
		$listWork.isotope({
			itemSelector: ".work_item",
			layoutMode: "fitRows",
			getSortData: {
				all: ".all",
				website: ".website",
				logo: ".logo",
				advertising: ".advertising"
			}
		});

		$btnWork.on("click", function(event){
			event.preventDefault();
			var filterName = $(this).attr("data-filter");
			$listWork.isotope({
				filter: filterName
			});

			$btnWork.removeClass("active");
			$(this).addClass("active");
		});

	}

	function smooth(){
    $(".btn_menu")
		.on("click", function(event) {
			event.preventDefault();
			var $ele  = $nav.find("ul");
			if( $ele.hasClass("open") ) {
				$ele.removeClass("open");
				$ele.stop().animate({
					"left": "-50%"
				}, 500);
			} else {
				$ele.addClass("open");
				$ele.stop().animate({
					"left": 0
				}, 500);
			}
		});

		$("nav ul li a").on("click", function(e) {
			e.preventDefault();
			var
        href = $(this).attr("href"),
        $target = $((href == "#" || href == "" || !href)? "html" : href);

       var position = $target.offset().top;
       $("body, html").animate({
       	"scrollTop": position
       }, 500);
		});

		$(document).mouseup(function(e) {
		  var container = $("nav");
		  if (!container.is(e.target) && container.has(e.target).length === 0) {
		    $("nav ul").stop().animate({
					"left": "-50%"
				}, 500).removeClass("open");
		  }
		});

	}

	function revealOnScroll() {
    var
    	scrolled = $window.scrollTop();
			winHeight = window.innerHeight;

    $(".revealOnScroll").each(function () {
      var
      	$this = $(this),
      	data = $this.data('animation'),
        offsetTop = $this.offset().top;

      if (scrolled + winHeight > offsetTop) {
       	$this.addClass('animated ' + data);
      }
    });
  }

	$(function(){
		init();
	});

})(jQuery);