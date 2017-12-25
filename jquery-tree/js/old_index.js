;(function($){
	"use strict";

	var
		timer,
		padding = 15,
		$item = $(".item"),
		btn_option = '<div class="btn_option">&#9679;&#9679;&#9679;</div>';

	var
		folder = '<div class="sub_item">';
		folder += '<div class="item" data-type="folder"><span class="icon_close">css</span></div>';
		folder += '</div>';

	var
		file = '<div class="sub_item">';
		file += '<div class="item" data-type="file"><span class="icon_file">index.html</span></div>';
		file += '</div>';

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
		xform = '<div class="form"><input type="text" name="txt_name"><button id="submit">&#43;</button><button id="cancel">&times;</button></div>';

	function init() {

			$item.each(function() {

				var $this = $(this);

				$this.on({
					"mouseenter": function() {
						$this.append(btn_option);
						$(".btn_option").one("mouseup", function() {
							if ($this.data("type") == "folder") {
								$this.append(folder_option);
								$(".file_list li").mouseup(function() {

									var $thisLi = $(this);
									$this.append(xform);

									according();

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
										if ($thisLi.data("action") == "new_folder") {
											$this.after(folder);
											$this.next(".sub_item").css("padding-left", padding+"px");
											$this.find(".form").remove();
										}
									});

									$("#cancel").click(function() {
										$this.find(".form").remove();
									});
								});
							}
						});
					},
					"mouseleave": function() {
						$this.find(".file_list").remove();
					}
				});

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