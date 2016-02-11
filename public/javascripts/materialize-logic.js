$(document).ready(function() {
    $('.parallax').parallax();
    $('.modal-trigger').leanModal();
    $('ul.tabs').tabs('select_tab', 'login-tab');
    // override materialize card reveal behaviour
    $(document).off('click.card', '.card').on('click.card', '.card', function(e) {
        if ($(this).find('> .card-reveal').length) {
            if ($(e.target).is($('.card-reveal .card-title')) || $(e.target).is($('.card-reveal .card-title i'))) {
                $(e.target).closest('.card').velocity('reverse');
                $(this).find('.btn-scriptum-submit').css({opacity: '0'});
                $(this).find('.card-reveal').velocity({
                    translateY: 0
                }, {
                    duration: 225,
                    queue: false,
                    easing: 'easeInOutQuad',
                    complete: function() {
                        $(this).css({
                            display: 'none'
                        });
                    }
                });
            } else if ($(e.target).is($('.card .activator')) ||
                $(e.target).is($('.card .activator i'))) {
                $(e.target).closest('.card').css('overflow', 'hidden');
                $(this).find('.btn-scriptum-submit').css({opacity: '1'});
                $(e.target).closest('.card').velocity({
                    height: 500
                }, 225, 'easeInOutQuad', function() {});
                $(this).find('.card-reveal').css({
                    display: 'block'
                }).velocity("stop", false).velocity({
                    translateY: '-100%'
                }, {
                    duration: 300,
                    queue: false,
                    easing: 'easeInOutQuad'
                });
            }
        }

        $('.card-reveal').closest('.card').css('overflow', 'hidden');
    });
});
