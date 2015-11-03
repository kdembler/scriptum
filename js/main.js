(function($) {
  $(function() {

    $('.parallax').parallax();
    $('#getstarted-button').click(function(e) {
      e.preventDefault();
      $('html,body').animate({
        scrollTop: $("#content").offset().top
      }, 'slow');
    })

  }); // end of document ready
})(jQuery); // end of jQuery name space
