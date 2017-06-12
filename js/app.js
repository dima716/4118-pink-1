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
})(window);
