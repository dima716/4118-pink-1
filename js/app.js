(function(global) {
  'use strict';
  var toggleMenu = document.getElementsByClassName('main-nav__toggler')[0],
      mainNav = document.getElementsByClassName('main-nav')[0];

  toggleMenu.addEventListener('click', function () {
    if ( mainNav.classList.contains('main-nav--open') ) {
      mainNav.classList.remove('main-nav--open');
    } else {
      mainNav.classList.add('main-nav--open');
    }
  });

  function Slider(options) {
    this.activePaginatorItemClass = options.activePaginatorItemClass;
    this.slider = global.document.querySelector(options.selector);
  }

  Slider.prototype.init = function (argument) {
    var sliderInner = this.slider.querySelector('.slider__inner'),
        sliderItems = sliderInner.querySelectorAll('.slider__item'),
        slideWidth = sliderItems[0].offsetWidth,
        sliderPagination = this.slider.querySelector('.slider__pagination'),
        sliderPaginationItems = sliderPagination.querySelectorAll('.slider__pagination-item'),
        transformValue = 0;


    function clearSliderPaginationItems() {
      [].forEach.call(sliderPaginationItems, (function (item) {
        item.classList.remove(this.activePaginatorItemClass);
      }).bind(this));
    }

    [].forEach.call(sliderPaginationItems, function(item, index) {
      item.setAttribute('data-index', index);
    });

    var currentIndex = global.parseInt(sliderPagination.querySelector('.' + this.activePaginatorItemClass).getAttribute('data-index'));

    sliderPagination.addEventListener('click', (function (event) {
      var target = event.target;

      while(target != sliderPagination) {
        if (target.tagName == 'SPAN') {
          var index = global.parseInt(target.getAttribute('data-index')),
              moveDistance = Math.abs(index - currentIndex) * slideWidth;

          if (index == currentIndex) return;

          clearSliderPaginationItems.call(this);
          target.classList.add(this.activePaginatorItemClass);
          sliderItems[index].classList.add('slider__item--active');

          sliderItems[currentIndex].classList.remove('slider__item--active');

          currentIndex = index;
          return;
        }

        target = target.parentNode;
      }
    }).bind(this));
  };


  var reviewSlider = new Slider({
    selector: '.reviews__list',
    activePaginatorItemClass: 'reviews__pagination-item--active'
  });

  var pricesSlider = new Slider({
    selector: '.prices__list',
    activePaginatorItemClass: 'prices__pagination-item--active'
  });

  reviewSlider.init();
  pricesSlider.init();
})(window);
