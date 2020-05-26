(() => {
  /* eslint-disable no-unused-vars */
  const version = '1.0.0';
  const name = 'DevArtBack';
  const shortcut = 'back';
  /* eslint-enable no-unused-vars */

  const BACK_BTN_CLASS = '._1JKQ8';

  const backBtn = document.querySelector(BACK_BTN_CLASS);
  if (backBtn) {
    backBtn.click();
  }
})();
