(function ($) {
    'use strict';

    jQuery(document).ready(function () {

/**
 *  Добавить в закладки
 * */

//  Сначала мы определяем элемент, в котором действие «Добавить в закладку» будет срабатывать
var triggerBookmark = $(".js-bookmark"); // Это должен быть тег `a`

triggerBookmark.click(function() {

    if (window.sidebar && window.sidebar.addPanel) { // Firefox <23

        window.sidebar.addPanel(document.title,window.location.href,'');

    } else if(window.external && ('AddFavorite' in window.external)) { // Internet Explorer

        window.external.AddFavorite(location.href,document.title);

    } else if(window.opera && window.print || window.sidebar && ! (window.sidebar instanceof Node)) { // Opera <15 и Firefox >23
        /**
         *  Для Firefox <23 и Opera <15 нет необходимости добавлять JS в закладки
         * Единственное, что нужно, это `title` and a `rel="sidebar"`
         */
        triggerBookmark.attr('rel', 'sidebar').attr('title', document.title);
        return true;

    } else { // Для других браузеров (в основном WebKit) мы используем простое оповещение, чтобы информировать пользователей о том, что они могут добавлять в закладки с помощью ctrl + D / cmd + D

        alert('Вы можете добавить эту страницу в закладки, нажав ' + (navigator.userAgent.toLowerCase().indexOf('mac') != - 1 ? 'Command/Cmd' : 'CTRL') + ' + D на клавиатуре.');

    }
    // Если у вас есть что-то в `href` вашего триггера
    return false;
});

  });

})(jQuery);
