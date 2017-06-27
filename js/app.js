(function(global) {
  'use strict';
  var geocoder, map, reviewSlider, pricesSlider, toggleMenu, mainNav;

  function initMap() {
    geocoder = new google.maps.Geocoder();

    geocoder.geocode({
      'address': 'г. Санкт-Петербург, ул.Большая Конюшенная, д. 19/8'
    }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map = new google.maps.Map(document.getElementsByClassName('contacts__map')[0], {
          center: results[0].geometry.location,
          zoom: 16,
          scrollwheel: false
        });

        var image = 'img/icon-map-marker.svg';

        var placeMarker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: map,
          icon: image
        });
      }
    });
  }

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

  toggleMenu = document.getElementsByClassName('main-nav__toggler')[0];
  mainNav = document.getElementsByClassName('main-nav')[0];

  toggleMenu.addEventListener('click', function () {
    if ( mainNav.classList.contains('main-nav--open') ) {
      mainNav.classList.remove('main-nav--open');
    } else {
      mainNav.classList.add('main-nav--open');
    }
  });

  if (document.getElementsByClassName('contacts__map')[0]) {
    global.initMap = initMap;
  }

  if (document.getElementsByClassName('reviews__list')[0] && document.getElementsByClassName('prices__list')[0]) {
    reviewSlider = new Slider({
      selector: '.reviews__list',
      activePaginatorItemClass: 'reviews__pagination-item--active'
    });

    pricesSlider = new Slider({
      selector: '.prices__list',
      activePaginatorItemClass: 'prices__pagination-item--active'
    });

    reviewSlider.init();
    pricesSlider.init();
  }
})(window);
