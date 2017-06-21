(function(global) {
  'use strict';

  function Slider(options) {
    this.activePaginatorItemClass = options.activePaginatorItemClass;
    this.slider = global.document.querySelector(options.selector);
  }

  Slider.prototype.init = function (argument) {
    var sliderInner = this.slider.querySelector('.slider__inner');

    function clearSliderPaginationItems() {
      [].forEach.call(sliderPaginationItems, (function (item) {
        item.classList.remove(this.activePaginatorItemClass);
      }).bind(this));
    }

    if (sliderInner) {
      var sliderItems = sliderInner.querySelectorAll('.slider__item'),
      slideWidth = sliderItems[0].offsetWidth,
      sliderPagination = this.slider.querySelector('.slider__pagination'),
      sliderPaginationItems = sliderPagination.querySelectorAll('.slider__pagination-item'),
      sliderPrevious = this.slider.querySelector('.slider__control--previous'),
      sliderNext = this.slider.querySelector('.slider__control--next');


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

      if (sliderPrevious) {
        sliderPrevious.addEventListener('click', (function (event) {
          if (currentIndex - 1 < 0) return;

          sliderItems[currentIndex].classList.remove('slider__item--active');
          currentIndex = currentIndex - 1;

          clearSliderPaginationItems.call(this);
          sliderPaginationItems[currentIndex].classList.add(this.activePaginatorItemClass);

          sliderItems[currentIndex].classList.add('slider__item--active');
          return;
        }).bind(this));
      }

      if (sliderNext) {
        sliderNext.addEventListener('click', (function (event) {
          if (currentIndex + 1 >= sliderItems.length) return;

          sliderItems[currentIndex].classList.remove('slider__item--active');
          currentIndex = currentIndex + 1;

          clearSliderPaginationItems.call(this);
          sliderPaginationItems[currentIndex].classList.add(this.activePaginatorItemClass);

          sliderItems[currentIndex].classList.add('slider__item--active');
          return;
        }).bind(this));
      }
    }
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
