var $body;
var $HeroHeader;

$(function() {

  $body       = $("body");
  $HeroHeader    = $(".hero-header");

  function adjustHeroHeader() {
    // Main Header
    // if ($body.scrollTop() < 34) {
    //   $HeroHeader.height(84 - $body.scrollTop());
    // } else {
    //   $HeroHeader.height('56px');
    // }
    if ($body.scrollTop() > 0) {
      $HeroHeader.addClass('opaque');
    } else {
      $HeroHeader.removeClass('opaque');
    }

    if ($body.scrollTop() > 240) {
      $HeroHeader.addClass('show-cta');
    } else {
      $HeroHeader.removeClass('show-cta');
    }
  };

  $('section > header').addClass('locked-bottom');

  function adjustSectionHeaders() {
    $('section').each(function() {
      // Section scrolled into viewport
      if ($(this).offset().top - $body.scrollTop() >= $(window).height() - $(this).find('header').height()) {
        $(this).find('header').addClass('locked-bottom');
      } else {
        $(this).find('header').removeClass('locked-bottom');
      }
      // Section scrolled to top
      // if ($(this).offset().top - $body.scrollTop() < 0) {
      //   $(this).find('header').addClass('locked-top');
      // } else {
      //   $(this).find('header').removeClass('locked-top');
      // }
    });
  };

  $(window).scroll($.throttle(10, adjustHeroHeader));
  $(window).scroll($.throttle(50, adjustSectionHeaders));

  adjustHeroHeader();
  adjustSectionHeaders();

  // Early access form
  $('[href^="#get-access"]').click(function(e) {
    e.preventDefault();
    $('body').addClass('get-access-active');
  });

  $('.close-get-access').click(function(e) {
    e.preventDefault();
    $('body').removeClass('get-access-active');
  });

  // Scroll to
  $('section header a[href^="#"]').click(function(e) {
    e.preventDefault();
    var duration = Math.abs($(this.hash).offset().top - $body.scrollTop()) * .75;
    duration = (duration > 1000) ? 1000 : duration;
    var offset = this.hash == "#tenants" ? -128 : -84;
    $(window).stop(true).scrollTo(this.hash, {
      duration: duration,
      offset: offset,
      interrupt: false
    });
  });

  // Hero slides
  var totalSlides = $('.hero-screens img').length;
  var slideIndex = 1;

  function showSlide(n) {
    $('.hero-screens img').fadeOut(1000, 'swing');
    $('.hero-screens img:nth-child(' + n + ')').stop().fadeIn(1000, 'swing');
  }

  setInterval(function() {
    if (slideIndex > totalSlides) {
      slideIndex = 1;
    }
    showSlide(slideIndex);
    slideIndex++;
  }, 5000);

});