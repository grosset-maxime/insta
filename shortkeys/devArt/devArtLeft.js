(() => {
  /* eslint-disable no-unused-vars */
  const version = '1.0.1';
  const name = 'DevArtLeft';
  const shortcut = 'left';
  /* eslint-enable no-unused-vars */

  const LEFT_ARROW_CLASS = '._1GZIO';

  const leftArrow = document.querySelector(`${LEFT_ARROW_CLASS} a`);
  if (leftArrow) {
    leftArrow.click();
  }
})();
