'use strict';

if ('ontouchstart' in window || 'ontouch' in window) {
  document.body.classList.add('touch-device');
} else {
  document.body.classList.add('non-touch-device');
}
