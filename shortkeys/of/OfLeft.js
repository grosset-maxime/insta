/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
(() => {
  /* eslint-disable no-unused-vars */
  const version = '1.0.1';
  const name = 'OfLeft';
  const shortcut = 'left';
  /* eslint-enable no-unused-vars */

  const urlPathname = window.location.pathname;
  const isTabPhotos = urlPathname.lastIndexOf('/photos') > 0;
  const isTabVideos = urlPathname.lastIndexOf('/videos') > 0;

  if (isTabPhotos || isTabVideos) {
    const nbRightEl = document.querySelector('.nbright');
    if (nbRightEl) {
      (nbRightEl.textContent = parseInt(nbRightEl.textContent, 10) - 1);
    }
  }
})();
