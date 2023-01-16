
const burger_menu =document.querySelector('.main__burger');
if (burger_menu){
  const menu =document.querySelector('.main-nav');
  burger_menu.addEventListener('click', function(){
      document.body.classList.toggle('_lock');
      menu.classList.toggle('on');
      burger_menu.classList.toggle('on');
  });
}


var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

  var body=document.querySelector('body');

  if(isMobile.any()){
    body.classList.add('touch');
    var arrow=document.querySelectorAll('.arrow');
    for (let i=0; i<arrow.length; i++){
      let thisLink=arrow[i].previousElementSibling;
      let subMenu=arrow[i].nextElementSibling;
      let thisArrow=arrow[i];
      thisLink.classList.add('parent');
      thisArrow.addEventListener('click', function(){
        this.nextElementSibling.classList.toggle('open');
        this.classList.toggle('active');
      });
    }
  }else{
    body.classList.add('mouse');
  };

  let offers=document.querySelectorAll('.offers_list_a');
  let offers_list=document.querySelectorAll('.offers_tabs_section');
  for(let i =0; i<offers.length; i++){
    offers[0].classList.add('offers_act');
    offers_list[0].classList.add('on');
    offers[i].addEventListener('click',function() {
      for (let j = 0; j < offers.length; j++) {
        offers[j].classList.remove('offers_act');
        offers_list[j].classList.remove('on');
      }
      offers[i].classList.add('offers_act');
      offers_list[i].classList.add('on');
    });
  }

  var load_ajax;
  var load =function () {
      if(load_ajax) load_ajax.abort();
      var data = {
          action: 'my_action',
          sum: $('[name="credit_sum"]').val(),
          term:$('[name="credit_day"]').val(),
          _token:$('[name="_token"]').val(),
      };
      console.log(data);
      load_ajax = $.post(location.href, data, function (resp) {
           $('.offer_list').html(resp);
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
  }

  var jquery_ui_slider = function() {
      jQuery('.calculator_input .jqueryui_slider').filter(function() {
          if (!$(this).data('jquery_ui_slider_hasscript')) {
              return true;
          }
      }).data('jquery_ui_slider_hasscript', true).each(function() {
          var th = $(this)
              , inp = th.closest('.calculator_input').find('input');
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
              th.closest('.calculator_input').addClass('slider_hover');
          }, function() {
              th.closest('.calculator_input').removeClass('slider_hover');
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
  jQuery(document).find(".feedback_wall:not(:visible):lt(3)").slideToggle('fast')
  jQuery(".show-more").click(function(){
      jQuery(document).find(".feedback_wall:not(:visible):lt(3)").slideToggle('fast',
          function() {
              if (jQuery(document).find(".feedback_wall:not(:visible)").length==0) {
                jQuery(".show-more").css("display","none");
              }
          }
      );
  })
