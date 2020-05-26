(() => {
  /* eslint-disable no-unused-vars */
  const version = '1.0.0';
  const name = 'DevArtLeft';
  const shortcut = 'left';
  /* eslint-enable no-unused-vars */

  const LEFT_ARROW_CLASS = '._3KTiJ';

  const leftArrow = document.querySelector(`${LEFT_ARROW_CLASS} a`);
  if (leftArrow) {
    leftArrow.click();
  }
})();
