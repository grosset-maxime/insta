(() => {
  /* eslint-disable no-unused-vars */
  const version = '1.0.0';
  const name = 'DevArtBack';
  const shortcut = 'backspace';
  /* eslint-enable no-unused-vars */

  const BACK_TO_WATCH_BTN_CLASS = '._1JKQ8';
  const BACK_BTN_CLASS = '._3ngkd';

  let backBtn = document.querySelector(BACK_TO_WATCH_BTN_CLASS);

  if (!backBtn) {
    backBtn = document.querySelector(BACK_BTN_CLASS);
  }

  if (backBtn) {
    backBtn.click();
  }
})();
