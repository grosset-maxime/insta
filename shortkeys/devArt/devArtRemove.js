/* eslint-disable no-underscore-dangle */
(() => {
  /* eslint-disable no-unused-vars */
  const version = '1.0.2';
  const name = 'DevArtRemove';
  const shortcut = 'del';
  /* eslint-enable no-unused-vars */

  const STAR_NAME_IN_LIST = '._3riIJ';
  const REMOVE_BTN_CLASS = '.sA99L';

  const starName = window._lastViewedStarName;

  if (!starName) { return false; }

  const stars = document.querySelectorAll(STAR_NAME_IN_LIST);
  const starEl = [].find.call(stars || [], (el) => starName === el.textContent.toLowerCase());

  if (!starEl) { return false; }

  const removeBtn = starEl
    .parentElement
    .parentElement
    .parentElement
    .parentElement
    .parentElement.querySelector(REMOVE_BTN_CLASS);

  if (removeBtn) {
    removeBtn.click();
  }

  return true;
})();
