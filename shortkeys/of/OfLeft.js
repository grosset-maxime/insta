/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
(() => {
  /* eslint-disable no-unused-vars */
  const version = '1.0.0';
  const name = 'OfLeft';
  const shortcut = 'left';
  /* eslint-enable no-unused-vars */

  const nbRightEl = document.querySelector('.nbright');
  if (nbRightEl) {
    (nbRightEl.textContent = parseInt(nbRightEl.textContent, 10) - 1);
  }
})();
