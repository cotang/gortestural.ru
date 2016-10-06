// window.$ = window.jQuery =  require('jquery');
// window.slick =              require('./vendor/bower/slick');


jQuery(document).ready(function($){  

  /* language change */
  $('.language__name').click(function(e) { 
    e.preventDefault();
    $(this).toggleClass('language__name--active');
    $(this).closest('.language').toggleClass('language--active');
    $(this).closest('.language').find('.language__dropdown').toggle();   
  });
  $('.language__link').on('click', function(e){
    e.preventDefault();
    $(this).closest('.language').find('.language__name').html($(this).html()).removeClass('language__name--active');
    $(this).closest('.language').removeClass('language--active');
    $(this).closest('.language__dropdown').hide(); 
    return false;
  });


  /* header раскрытие списка городов */
  $('.city__name').click(function(e) { 
      e.preventDefault();    
      $(this).closest('.city').find('.city__dropdown').toggle();
      $(this).closest('.city').toggleClass('city--active');
  });
  $('.city__dropdown').mouseleave(function(){
    $(this).fadeOut();
    $(this).closest('.city').removeClass('city--active');
  });
  /* изменение названия, телефона и почты при выборе города */
  $('.city__item').on('click', function(){
    $(this).closest('.city').removeClass('city--active');
    $(this).closest('.city').find('.city__name').html($(this).html());
    var contactsHeader = $('.contacts-header');
    $(contactsHeader).find('.contacts-header__link--email').html($(this).data('email')).attr('href', 'mailto:'+$(this).data('email'));
    var prefix = $(this).data('prefix');
    var hrefPrefix = prefix.replace(/\D/g, "");
    var tel1 = $(this).data('tel1');
    var hrefTel1 = tel1.replace(/\D/g, "");
    $(contactsHeader).find('.contacts-header__link--tel1').html(prefix+tel1).attr('href', 'tel:'+hrefPrefix+hrefTel1);
    if ($(this).data('tel2') !== undefined) {
      $(contactsHeader).find('.contacts-header__link--tel2').show().html(prefix+tel2).attr('href', 'tel:'+hrefPrefix+hrefTel2);
    } else {
      $(contactsHeader).find('.contacts-header__link--tel2').hide();
    }
    $('.city__dropdown').hide(); 
    return false;
  });

  /* hamburger - product-type */
  $('.hamburger').click(function(e) { 
      e.preventDefault();    
      $('.menu-dropdown--product-type').show();
  });
  /* menu - document-type */
  $('.document-type-menu__link').click(function(e) { 
      e.preventDefault();    
      $('.menu-dropdown--document-type').show();
  });
  $('.menu-dropdown__close').click(function(e) { 
      e.preventDefault();
      $(this).closest('.menu-dropdown').hide();
  });

    // Timeline - tabs
  $('.timeline__item').on('click', function() {
    $(this).closest('.timeline').find('.timeline__item').removeClass('timeline__item--active');
    $(this).addClass('timeline__item--active'); 
    var id = $(this).attr('class');
    var id = id.replace(/\D/g, "");
    var idText = '.timeline__description--' + id;
    $(this).closest('.timeline').find($('.timeline__description')).removeClass('timeline__description--active');   
    $(idText).addClass('timeline__description--active'); 
  }); 

  /* галерея "специалисты" */
  $('.specialists__gallery').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    centerMode: true,
    centerPadding: '0'
  });

  /* галерея "другие документы" */
  $('.other-docs__gallery').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  /* Faq accordion */
  $('.faq__ask').click(function(){
    if($(this).next('.faq__text').is(":visible")) {
      $(this).next('.faq__text').hide();
      $(this).closest('.faq__item').removeClass('faq__item--active');
    } else {
      $(this).closest('.faq__questions').find('.faq__text').hide();
      $(this).siblings('.faq__text').show();
      $(this).closest('.faq__questions').find('.faq__item--active').removeClass('faq__item--active');
      $(this).closest('.faq__item').addClass('faq__item--active');
    }
  }); 

  /* галерея "другие документы" */
  $('.gratitude__gallery').slick({
    infinite: true,
    arrows: false,
    dots: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    centerMode: true,
    centerPadding: '0',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  /* галерея "клиенты" */
  $('.clients__gallery').slick({
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  /* плавный скролл наверх */
  $(window).scroll(function () {
    if ($(this).scrollTop() > 102) {
      $('.up').fadeIn();
    } else {
      $('.up').fadeOut();
    }
  });
  $('.up').click(function () {
    $("html, body").animate({
      scrollTop: 0
    }, 600);
    return false;
  });

  /* Form in the modal window */
  $('.btn[data-form]').click( function(e){
    e.preventDefault(); 
    var suffix = $(this).data("form"); 
    var overlay = $('.overlay');
    $('body').css({"overflow":"hidden"});   
    $(overlay).show();
    var formClass = '.form--' + suffix;
    $(overlay).find(formClass).fadeIn();    
  });
  /* Close the modal window */
  $('.form__close').click( function(e){ 
    e.preventDefault();
    var overlay = $('.overlay'); 
    $('body').css({"overflow":"auto"});
    $(overlay).find(".form").fadeOut();
    $(overlay).fadeOut(400);
  });

  /* Название документа в блоке Compulsory docs в textarea в всплывающей форме */
  $('.compulsory-docs .btn').click(function(){
      var doc = $(this).closest('.compulsory-docs__item').find('.compulsory-docs__caption').text();
      $('.overlay .form--application .form__textarea').text(doc);
  });

  /* Значение data-id в блоке branches в textarea в всплывающей форме */
  $('.btn--branches').click(function(){
      var value = $(this).data('id');
      $('.overlay .form--application .form__textarea').text("Пакет документов для отрасли: "+value);
  });

    /* одинаковая высота у promo__title */
    var promoTitleMaxHeight = 0;
    var promoTitleItem = $(".promo__title");
    $(promoTitleItem).each(function(){
     if ( $(this).height() > promoTitleMaxHeight ) 
     {
      promoTitleMaxHeight = $(this).height();
     }
    });
    $(promoTitleItem).height(promoTitleMaxHeight);
    /* одинаковая высота у promo__text */
    var promoTextMaxHeight = 0;
    var promoTextItem = $(".promo__text");
    $(promoTextItem).each(function(){
     if ( $(this).height() > promoTextMaxHeight ) 
     {
      promoTextMaxHeight = $(this).height();
     }
    });
    $(promoTextItem).height(promoTextMaxHeight);


























  /* Hamburger */
  // if ($(window).width() < 768) {
  //   var headerNavItem = $('.header .nav__item');
  //   $('.nav__hamburger').show();
  //   $(headerNavItem).hide(); 
  //   $('.hamburger').click(function(e){
  //     e.preventDefault();
  //     $(this).toggleClass('hamburger--close');
  //     $(headerNavItem).toggle();
  //   });               
  // }

  /* Открывание меню поиска по клику на иконку */
  // if ($(window).width() <= 1024) {
  //   $('.search__form').hide(); 
  //   $('.search__icon').click(function(e){
  //     e.preventDefault();
  //     $('.search__form').toggle();
  //   });               
  // }

  /* галерея "с нами уже работают" */
  $('.reviews-section__gallery').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',      
    variableWidth: true
  });

  // /* Review-section in the modal window */
  // $('.reviews-section__link').click( function(e){ 
  //   e.preventDefault(); 
  //   $('body').css({"overflow":"hidden"});   
  //   $('.overlay').show();
  //   $(this).closest('.reviews-section__slide').find('.reviews-section__modal').clone().appendTo($('.overlay'))
  //   .show()
  //   .animate({opacity: 1}, 200); 
  // });
  // /* Close the modal window */
  // $('.overlay').click( function(){ 
  //   $('body').css({"overflow":"auto"});
  //   $(this).find('.reviews-section__modal')
  //     .animate({opacity: 0}, 200,  
  //       function(){
  //         $(this).remove();
  //         $('.overlay').fadeOut(400);
  //       }
  //     );
  // }); 

  // /* Review in the modal window */
  // $('.reviews__img').click( function(e){ 
  //   e.preventDefault(); 
  //   $('body').css({"overflow":"hidden"});   
  //   $('.overlay').show();
  //   $(this).closest('.reviews__pic').find('.reviews__modal').clone().appendTo($('.overlay'))
  //   .show()
  //   .animate({opacity: 1}, 200); 
  // });
  // /* Close the modal window */
  // $('.overlay').click( function(){ 
  //   $('body').css({"overflow":"auto"});
  //   $(this).find('.reviews__modal')
  //     .animate({opacity: 0}, 200,  
  //       function(){
  //         $(this).hide();
  //         $('.overlay').fadeOut(400);
  //       }
  //     );
  // }); 

  // /* Form in the modal window */
  // $('.btn').click( function(e){
  //   e.preventDefault(); 
  //   var suffix = $(this).data("form"); 
  //   var overlay = $('.overlay');
  //   $('body').css({"overflow":"hidden"});   
  //   $(overlay).show();
  //   var formClass = '.form--' + suffix;
  //   $(overlay).find(formClass).fadeIn();    
  // });
  // /* Close the modal window */
  // $('.overlay').click( function(){ 
  //   $('body').css({"overflow":"auto"});
  //   $(this).find(".form").fadeOut();
  //   $('.overlay').fadeOut(400);
  // }); 

  /* открывание ответа по ссылке "читать далее" */
  $('.question__details').click(function(e) {
      e.preventDefault();
      $(this).closest('.question').find('.question__answer').toggle();      
  });

});

