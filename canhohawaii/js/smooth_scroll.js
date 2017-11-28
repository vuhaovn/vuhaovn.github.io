;(function($){
  "use strict";
  var Index = $.index = (function() {

    var
      $scroller = null;

    function init() {
      $scroller = $( (/safari/i.test(navigator.userAgent)) ? "body" : "html" );

      $("a[href^=#]")
      .not(".nav-tabs a")
      .on({
        "click": function(){
          var
            href = $(this).attr("href"),
            $target = $( (href == "#" || href == "" || !href) ? "html" : href ),
            position = $target.offset().top;


          $scroller.animate({
            "scrollTop": position
          }, 500);

          return false;
        }
      });

      // var bx_apartment = $('#bx_apartment').bxSlider({
      //   pagerCustom: '#apartment_pager',
      //   mode: 'fade',
      //   controls: false
      // });

      var bx_scenery = $('#bx_scenery').bxSlider({
        auto: true,
        pagerCustom: '.img-control',
        mode: 'fade',
        controls: false
      });
      $('.bxslider').bxSlider({
        auto: false,
        controls: false
      });

      var $apartmentButton = $("#apartment_pager a");
      var current = 0;
      $apartmentButton.on("click", function(e) {
        e.preventDefault();
        var $this = $(this),
        selected = $this.index();

        if( current != selected ) {
          current = selected;
          $("#bx_apartment li").css("display","none");
          $("#bx_apartment li").eq(selected).stop().fadeIn();
          $apartmentButton.removeClass("active");
          $this.addClass("active");
        }

        return false;
      })
      closePopup();

    }
    var closePopup = function(){
      $("#popup .btn_close, #overlay").off().on("click", function(event){
        event.preventDefault();
        $("#popup, #overlay").fadeOut();
      });
    };

    return {
      init: init
    };

  })();
  $(Index.init);
})(jQuery);
