<<<<<<< HEAD
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
=======
(function($) {
  "use strict";

  function init() {
    $('#tree')
      .jstree({
        'core': {
          'data': {
            'url': '?operation=get_node',
            'data': function(node) {
              return { 'id': node.id };
            }
          },
          'check_callback': function(o, n, p, i, m) {
            if (m && m.dnd && m.pos !== 'i') { return false; }
            if (o === "move_node" || o === "copy_node") {
              if (this.get_node(n).parent === this.get_node(p).id) { return false; }
            }
            return true;
          },
          'themes': {
            'responsive': false,
            'variant': 'small',
            'stripes': true
          }
        },
        'sort': function(a, b) {
          return this.get_type(a) === this.get_type(b) ? (this.get_text(a) > this.get_text(b) ? 1 : -1) : (this.get_type(a) >= this.get_type(b) ? 1 : -1);
        },
        'contextmenu': {
          'items': function(node) {
            var tmp = $.jstree.defaults.contextmenu.items();
            delete tmp.create.action;
            tmp.create.label = "New";
            tmp.create.submenu = {
              "create_folder": {
                "separator_after": true,
                "label": "Folder",
                "action": function(data) {
                  var inst = $.jstree.reference(data.reference),
                    obj = inst.get_node(data.reference);
                  inst.create_node(obj, { type: "default" }, "last", function(new_node) {
                    setTimeout(function() { inst.edit(new_node); }, 0);
                  });
                }
              },
              "create_file": {
                "label": "File",
                "action": function(data) {
                  var inst = $.jstree.reference(data.reference),
                    obj = inst.get_node(data.reference);
                  inst.create_node(obj, { type: "file" }, "last", function(new_node) {
                    setTimeout(function() { inst.edit(new_node); }, 0);
                  });
                }
              }
            };
            if (this.get_type(node) === "file") {
              delete tmp.create;
            }
            return tmp;
          }
        },
        'types': {
          'default': { 'icon': 'folder' },
          'file': { 'valid_children': [], 'icon': 'file' }
        },
        'unique': {
          'duplicate': function(name, counter) {
            return name + ' ' + counter;
          }
        },
        'plugins': ['state', 'dnd', 'sort', 'types', 'contextmenu', 'unique']
      })
      .on('delete_node.jstree', function(e, data) {
        $.get('?operation=delete_node', { 'id': data.node.id })
          .fail(function() {
            data.instance.refresh();
          });
      })
      .on('create_node.jstree', function(e, data) {
        $.get('?operation=create_node', { 'type': data.node.type, 'id': data.node.parent, 'text': data.node.text })
          .done(function(d) {
            data.instance.set_id(data.node, d.id);
          })
          .fail(function() {
            data.instance.refresh();
          });
      })
      .on('rename_node.jstree', function(e, data) {
        $.get('?operation=rename_node', { 'id': data.node.id, 'text': data.text })
          .done(function(d) {
            data.instance.set_id(data.node, d.id);
          })
          .fail(function() {
            data.instance.refresh();
          });
      })
      .on('move_node.jstree', function(e, data) {
        $.get('?operation=move_node', { 'id': data.node.id, 'parent': data.parent })
          .done(function(d) {
            //data.instance.load_node(data.parent);
            data.instance.refresh();
          })
          .fail(function() {
            data.instance.refresh();
          });
      })
      .on('copy_node.jstree', function(e, data) {
        $.get('?operation=copy_node', { 'id': data.original.id, 'parent': data.parent })
          .done(function(d) {
            //data.instance.load_node(data.parent);
            data.instance.refresh();
          })
          .fail(function() {
            data.instance.refresh();
          });
      })
      .on('changed.jstree', function(e, data) {
        if (data && data.selected && data.selected.length) {
          $.get('?operation=get_content&id=' + data.selected.join(':'), function(d) {
            if (d && typeof d.type !== 'undefined') {
              $('#data .content').hide();
              switch (d.type) {
                case 'text':
                case 'txt':
                case 'md':
                case 'htaccess':
                case 'log':
                case 'sql':
                case 'php':
                case 'js':
                case 'json':
                case 'css':
                case 'html':
                  $('#data .code').show();
                  $('#code').val(d.content);
                  break;
                case 'png':
                case 'jpg':
                case 'jpeg':
                case 'bmp':
                case 'gif':
                  $('#data .image img').one('load', function() { $(this).css({ 'marginTop': '-' + $(this).height() / 2 + 'px', 'marginLeft': '-' + $(this).width() / 2 + 'px' }); }).attr('src', d.content);
                  $('#data .image').show();
                  break;
                default:
                  $('#data .default').html(d.content).show();
                  break;
              }
            }
          });
        } else {
          $('#data .content').hide();
          $('#data .default').html('Select a file from the tree.').show();
        }
      });
  }

  $(function() {
    init();
  });
>>>>>>> 0fab7de6ef170f1ad8cc9bcf7e8a381740b9ca94

})(jQuery);