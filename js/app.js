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
    this.activeSliderItemIndex = options.activeSliderItemIndex || 0;
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

    sliderInner.style.width = slideWidth * sliderItems.length + 'px';

    sliderPagination.addEventListener('click', (function (event) {
      let target = event.target;

      while(target != sliderPagination) {
        if (target.tagName == 'SPAN') {
          var index = global.parseInt(target.getAttribute('data-index')),
              moveDistance = Math.abs(index - this.activeSliderItemIndex) * slideWidth;

          clearSliderPaginationItems.call(this);
          target.classList.add(this.activePaginatorItemClass);

          transformValue = index < this.activeSliderItemIndex ? transformValue + moveDistance : transformValue - moveDistance;

          sliderInner.style.transform = 'translateX(' + transformValue + 'px)';
          this.activeSliderItemIndex = index;
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

  reviewSlider.init();
})(window);
