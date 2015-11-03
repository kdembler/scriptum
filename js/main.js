(function($) {
  $(function() {

    $('.parallax').parallax();
    $('.modal-trigger').leanModal();

  }); // end of document ready
  function scrollToId(id) {
    $('html,body').animate({
      scrollTop: $(id).offset().top
    }, 'slow');
  };

  $('#getstarted-button').click(function(e) {
    e.preventDefault();
    scrollToId("#content");
  });$('#scrolltop-button').click(function(e) {
    e.preventDefault();
    scrollToId("#header");
  });
  $(".hover-lock").hover(function() {
    $(this).find("i").html("lock_open");
  }, function() {
    $(this).find("i").html("lock_outline");
  }); // end of jQuery name space

})(jQuery);
