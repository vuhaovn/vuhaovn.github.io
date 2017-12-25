;(function($){
	"use strict";

	var
		timer,
		padding = 15,
		$item = $(".item");

	function init() {

		$item.next(".sub_item").css("padding-left", padding+"px");

		$item.click(function(e) {
			var $ele = $("span");
			if ($ele.is(e.target)) {
				var isOpen = $(this).children("span").hasClass("open");
				if (isOpen) {
					$(this).children("span").removeClass("open");
				} else if ($(this).next(".sub_item").length > 0) {
					$(this).children("span").addClass("open");
				}
				$(this).next(".sub_item").stop().slideToggle(50);
			}
		});
	}

	$(function() {
		init();
	});

})(jQuery);