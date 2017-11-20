;(function($) {
  "use strict";

  var
    timer,
    $nav = null,
    $slider = null,
    $btnMenu = null,
    $imgResize = null,
    $overlay = null,
    $section = null,
    $popup = null,
    $btnClose = null,
    $btnYoutube = null,
    $btnStore = null,
    $imgStore = null,
    $radioStore = null,
    $maps = null,
    $itemStore = null,
    setting = {
      arrows: false,
      dots: true
    },
    browserWidth = 1502;

  function init() {
    $("body").append("<div id='overlay'></div>");
    $nav = $("nav");
    $slider = $(".slider .content");
    $btnMenu = $(".btn_menu");
    $imgResize = $(".img_resize");
    $overlay = $("#overlay");
    $section = $(".section");
    $popup = $("#popup");
    $btnClose = $(".close_popup");
    $btnYoutube = $(".thumb_youtube");
    $btnStore = $(".item_stories a");
    $imgStore = $(".imgStore .content");
    $radioStore = $(".imgStore .radio");
    $maps = $("#maps");
    $itemStore = $(".item_stories");

    var $stories01 = $(".img_stories01 img");
    var $stories02 = $(".img_stories02 img");
    var $imgCherry = $(".bg_cherry img");
    var $imgBoushi = $(".bg_boushi img");

    $(window).on("load resize", function() {
      var winWidth = window.innerWidth;
      var winHeight = window.innerHeight;
      var stories01 = 258;
      var stories02 = 364;
      var imgCherry = 194;
      var imgBoushi = 264;

      $("section").css({
        "minHeight": winHeight + "px"
      });

      $maps.css({
        "width": winWidth - 400 + "px"
      });

      $stories01.css({"width": winWidth*(stories01/browserWidth) + "px"});
      $stories02.css({"width": winWidth*(stories02/browserWidth) + "px"});
      $imgCherry.css({"width": winWidth*(imgCherry/browserWidth) + "px"});
      $imgBoushi.css({"width": winWidth*(imgBoushi/browserWidth) + "px"});

      $(".your_moment .txt, .stories h2, .event_packages h2, .contact h2, .your_moment .img_tree, .sns .instagram, .sns .facebook").addClass("scroll");
    });

    if ($section.length) {
      $section.scrollSections({
        navigation: true,
        before: function() {
          $(".your_moment .txt, .stories h2, .event_packages h2, .contact h2, .your_moment .img_tree, .sns .instagram, .sns .facebook").removeClass("scroll");
        },
        after: function() {
          $(".your_moment .txt, .stories h2, .event_packages h2, .contact h2, .your_moment .img_tree, .sns .instagram, .sns .facebook").addClass("scroll");
          spin();
        }
      });
    }

    if ($slider.length && $imgStore.length && $radioStore.length) {
      $slider.slick(setting);

      $imgStore.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: false,
        asNavFor: '.imgStore .radio',
        centerMode: true
      });

      $radioStore.slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.imgStore .content',
        centerMode: true,
        centerPadding: "10px",
        arrows: false,
        focusOnSelect: true
      });
    }

    buttonMenu();
    youtubeFrame();
    storeImage();
    spin();
  }

  function spin() {
    var i = 0;
    $itemStore.each(function(e) {
      this.removeAttribute('style');
      var r = Math.random();
      var deg = 5000 + Math.round(r * 500);
      deg = Math.pow(-1,i) * deg;
      var css = '-webkit-transform: rotate(' + deg + 'deg);';
      this.setAttribute('style', css);
      i++;
    });
  }

  function storeImage() {
    $btnStore.on("click", function(e) {
      e.preventDefault();
      $overlay.fadeIn();
      $(".imgStore").css({
        "opacity": 1,
        "z-index": 11
      });
    });

    $(".close_store").on("click", function() {
      $overlay.fadeOut();
      $(".imgStore").css({
        "opacity": 0,
        "z-index": -1
      });
    });
  }

  function light() {
    $(".stories").mousemove(function(event) {
      $(".light").css({
        "top": event.pageY - 1150,
        "left": event.pageX - 250
      });
    });
  }

  function youtubeFrame() {
    var src = $("iframe").attr("src");
    $btnYoutube.on("click", function(e) {
      e.preventDefault();
      $("#popup, #overlay").fadeIn(500);
      $("iframe").attr("src", src);
    });

    $btnClose.on("click", function() {
      $("#popup, #overlay").fadeOut(500);
      $("iframe").attr("src", "");
    });

  }

  function smoothScroll() {
    $("a[href^='#']").on("click", function(event) {
      event.preventDefault();
      var
        href = $(this).attr("href"),
        $target = $( ( href == "#" || href == "" || !href ) ? "html" : href ),
        position = $target.offset().top;
        $("html, body").animate({
          "scrollTop": position + "px"
        });
    });
  }

  function buttonMenu() {
    $btnMenu.on("click", function(e) {
      e.preventDefault();
      var $this = $(this);
      var active = $this.hasClass("active");
      if (active) {
        $this.removeClass("active");
        $this.next().removeClass("open");
      } else {
        $this.addClass("active");
        $this.next().addClass("open");
      }
    });
  }

  $(function() {
    init();
  });

})(jQuery);
