;(function($){
	"use strict";

	var
		padding = 15,
		$item = $(".item");

	function init() {
		hover();
		according();
		// chooseOption();
		addDom();
	}

	function addDom() {
		var data = [];
	}

	function chooseOption(item) {
		var 
			folder_option = '<ul class="file_list">';
			folder_option +='<li data-action="new_folder">New Folder</li>';
			folder_option +='<li data-action="new_file">New File</li>';
			folder_option +='<li data-action="rename">Rename</li>';
			folder_option +='<li data-action="delete">Delete</li>';
			folder_option +='</ul>';

		var
			file_option = '<ul class="file_list">';
			file_option +='<li data-action="rename">Rename</li>';
			file_option +='<li data-action="delete">Delete</li>';
			file_option +='</ul>';

		var
			xform = '<div class="form"><input type="text" name="txt_name">';
			xform += '<button id="submit">&#43;</button>';
			xform += '<button id="cancel">&times;</button></div>';

		var data = [];

		$(".btn_option").on("click", function() {
			$(item).addClass("active");
			$(item).append(xform);

			$("input[name='txt_name']").keyup(function() {
				if ($(this).val().length > 0) {
					$("#submit").show();
					$("#cancel").hide();
				} else {
					$("#cancel").show();
					$("#submit").hide();
				}
			});
			
			$(item).find("#submit").click(function() {
				var name = $("input[name='txt_name']").val();
				data.push(name);
			});
			// console.log( $(this).prev().html() );
		});


		$(document).mouseup(function(e) {
		  var container = $(".btn_option");
		  if (!container.is(e.target) && container.has(e.target).length === 0) {
				$(item).find(".file_list").hide();
				$(item).removeClass("active");
				setTimeout(function() {
					$(item).find(".file_list").remove();
				}, 1000);
		  }
		});
	}

	function hover() {
		var
			button = "<div class='btn_option'>&#9679;&#9679;&#9679;</div>";
		$item.on({
			"mouseenter": function() {
				$(this).append(button);
				chooseOption($(this));
			},
			"mouseleave": function() {
				$(this).find(".btn_option").remove();
			}
		});
	}

	function according() {
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