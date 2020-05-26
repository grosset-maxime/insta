(() => {
  /* eslint-disable no-unused-vars */
  const version = '1.0.0';
  const name = 'DevArtRight';
  const shortcut = 'right';
  /* eslint-enable no-unused-vars */

  const RIGHT_ARROW_CLASS = '._1Puyw';

  const rightArrow = document.querySelector(`${RIGHT_ARROW_CLASS} a`);
  if (rightArrow) {
    rightArrow.click();
  }
})();
