(function(global) {
  'use strict';
  var geocoder, map;

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

  global.initMap = initMap;
})(window);
