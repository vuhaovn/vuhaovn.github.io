;(function($){
	"use strict";

	var
		padding = 15,
		$item = $(".item");

	function init() {
		hover($item);
		according($item);
		addDom();
	}

	function hover(item) {
		var
			button = "<div class='btn_option'>&#9679;&#9679;&#9679;</div>";
		item.on({
			"mouseenter": function() {
				$(this).append(button);
			},
			"mouseleave": function() {
				$(this).find(".btn_option").remove();
			}
		});
	}

	function list($items) {
		var 
			foOpt = '<ul class="file_list">';
			foOpt +='<li data-action="new_folder">New Folder</li>';
			foOpt +='<li data-action="new_file">New File</li>';
			foOpt +='<li data-action="rename">Rename</li>';
			foOpt +='<li data-action="delete">Delete</li>';
			foOpt +='</ul>';

		var
			fiOpt = '<ul class="file_list">';
			fiOpt +='<li data-action="rename">Rename</li>';
			fiOpt +='<li data-action="delete">Delete</li>';
			fiOpt +='</ul>';

		$(".btn_option").on("click", function() {
			$items.addClass("active");
			if ($items.data("type") == "folder") {
				$items.append(foOpt);
				addDom($items);
			} else {
				$items.append(fiOpt);
			}
		});

		$(document).mouseup(function(e) {
		  var container = $(".btn_option");
		  if (!container.is(e.target) && container.has(e.target).length === 0) {
				$items.find(".file_list").hide();
				$items.removeClass("active");
				setTimeout(function() {
					$items.find(".file_list").remove();
				}, 1000);
		  }
		});

	}

	function addDom() {
		var item = "";
		$("#addFolder").click(function() {
			item += '<div class="sub_item">';
			item += '<div class="item" data-type="folder"><span class="icon_close">css</span></div>';
			item += '</div>';
			$item.append(item);
		});
	}

	function action($li, $items) {
		// var
		// 	folder = '<div class="sub_item">';
		// 	folder += '<div class="item" data-type="folder"><span class="icon_close">css</span></div>';
		// 	folder += '</div>';

		// var
		// 	file = '<div class="sub_item">';
		// 	file += '<div class="item" data-type="file"><span class="icon_file">index.html</span></div>';
		// 	file += '</div>';

		$("input[name='txt_name']").keyup(function() {
			if ($(this).val().length > 0) {
				$("#submit").show();
				$("#cancel").hide();
			} else {
				$("#cancel").show();
				$("#submit").hide();
			}
		});

		$("#submit").click(function() {
			$items.after(folder);
			$items.find(".form").remove();
			console.log($.parseHTML(folder).find(".item"));
			hover($items);
			according($items);
		});

		$("#cancel").click(function() {
			$this.find(".form").remove();
		});
	}

	function according(item) {
		item.next(".sub_item").css("padding-left", padding+"px");
		item.click(function(e) {
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