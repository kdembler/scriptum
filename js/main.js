(function($) {
  $(function() {

    $('.parallax').parallax();
    $('#getstarted-button').click(function(e) {
      e.preventDefault();
      $('html,body').animate({
        scrollTop: $("#content").offset().top
      }, 'slow');
    });
    $('.modal-trigger').leanModal();

  }); // end of document ready
  $(".hover-lock").hover(function() {
    $(this).find("i").html("lock_open");
  }, function() {
    $(this).find("i").html("lock_outline");
  })(jQuery); // end of jQuery name space

})(jQuery);
