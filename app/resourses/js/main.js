window.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

$(function () {

    var onResize = function () {

        $('.sidebar-sticky').stickySidebar({
            topSpacing: 0,
            bottomSpacing: 60
        });
    };


    $(window).resize(onResize);

    onResize();


    var popup_open = function () {
        var html = '<div class="popup_bg"></div>';
        html += '<div class="popup_container">'+$('.popup_body_outer').html()+'<div class="popup_close"></div></div>';
        $('body').prepend(html);
    };

    var popup_close = function () {
        $('.popup_bg').remove();
        $('.popup_container').remove();
    };

    $(document).on('click', '.popup_close', function (e) {
        Cookies.set('popup_closes', '1', { expires: 1 });
        popup_close();
    });

    $(window).scroll(function () {
        if(false && $('.popup_container').length === 0 && window.isMobile && !Cookies.get('popup_closes')) {
            //popup_open();
        }
    });

    var load_ajax;
    var load = function () {
        if(load_ajax) load_ajax.abort();
        var data = {
            sum: $('[data-calc="sum"]').val(),
            term: $('[data-calc="term"]').val()
        };
        load_ajax = $.post('/ajax/load.php', data, function (resp) {
            $('.offers').html(resp);
        });
    };

    var offers_load_timeout = null;

    var jquery_ui_slider_after_change = function(th, input) {
        var temp_value = parseInt(input.val());
        if (isNaN(temp_value)) {
            temp_value = th.data('min');
        } else if (temp_value < th.data('min')) {
            temp_value = th.data('min');
        } else if (temp_value > th.data('max')) {
            temp_value = th.data('max');
        }
        input.val(temp_value);
        th.slider('option', 'value', temp_value);
        input.data('beforeclear', temp_value)
        clearTimeout(offers_load_timeout);
        offers_load_timeout = setTimeout(function () {
            load();
        }, 300);
    };

    var jquery_ui_slider = function() {
        $('.credit_calc_row .jqueryui_slider').filter(function() {
            if (!$(this).data('jquery_ui_slider_hasscript')) {
                return true;
            }
        }).data('jquery_ui_slider_hasscript', true).each(function() {
            var th = $(this)
                , inp = th.closest('.credit_calc_row').find('input')
                , plus_btn = th.closest('.credit_calc_row').find('.slider_plus')
                , minus_btn = th.closest('.credit_calc_row').find('.slider_minus');
            th.slider({
                animate: true,
                range: 'min',
                value: th.data('val'),
                min: th.data('min'),
                max: th.data('max'),
                step: th.data('step'),
                slide: function(e, ui) {
                    inp.val(ui.value).trigger('change', [{
                        source: 'slider'
                    }]);
                }
            });
            th.hover(function() {
                th.closest('.credit_calc_row').addClass('slider_hover');
            }, function() {
                th.closest('.credit_calc_row').removeClass('slider_hover');
            });
            plus_btn.click(function() {
                var temp_value = th.slider('option', 'value')
                    , temp_min = th.slider('option', 'min')
                    , temp_max = th.slider('option', 'max');
                var interval = Math.floor((temp_max - temp_min) / 20);
                if (typeof (th.data('step')) !== 'undefined') {
                    interval = parseInt(th.data('step'));
                }
                temp_value += interval;
                if (temp_value > temp_max)
                    temp_value = temp_max;
                inp.val(temp_value).trigger('change', [{
                    source: 'plus_button'
                }]);
            });
            minus_btn.click(function() {
                var temp_value = th.slider('option', 'value')
                    , temp_min = th.slider('option', 'min')
                    , temp_max = th.slider('option', 'max');
                var interval = Math.floor((temp_max - temp_min) / 20);
                if (typeof (th.data('step')) !== 'undefined') {
                    interval = parseInt(th.data('step'));
                }
                temp_value -= interval;
                if (temp_value < temp_min)
                    temp_value = temp_min;
                inp.val(temp_value).trigger('change', [{
                    source: 'minus_button'
                }]);
            });
            inp.on('keypress', function(e) {
                if (e.which === 13) {
                    inp.trigger('blur');
                }
            }).focus(function() {
                inp.data('beforeclear', inp.val()).val('');
            }).blur(function() {
                if (typeof (inp.data('beforeclear')) !== 'undefined') {
                    inp.val(inp.data('beforeclear'));
                }
            }).change(function() {
                inp.data('beforeclear', inp.val());
            });
            inp.change(function() {
                jquery_ui_slider_after_change(th, inp);
            });
            jquery_ui_slider_after_change(th, inp);
        });
    };

    jquery_ui_slider();

    function rand(min, max){
        if(min === 0){
            return Math.floor((Math.random() * max) + 0);
        }else{
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }


    var notify_cnt = 1;
    setInterval(function () {
        init_notify()
    }, 1000);

    function init_notify() {
        if(notify_cnt > 3) return;
        if(rand(1, 5 * notify_cnt) !== 1) return;
        notify_cnt++;
        $.post('/ajax/notify.php', function (html) {
            var $div = $(html);
            $div.appendTo('.notifications');
            setTimeout(function () {
                $div.removeClass('animate');
            }, 100);
            setTimeout(function () {
                $div.css('top', '-20px').animate({'opacity': 0}, 700, function () {
                    $div.remove();
                });
                notify_cnt--;
            }, 10 * 1000);
        })
    }

});