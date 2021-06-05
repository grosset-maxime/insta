/* eslint-disable no-underscore-dangle */
(() => {
  /* eslint-disable no-unused-vars */
  const version = '1.0.6';
  const name = 'DevArtBack';
  const shortcut = 'backspace';
  /* eslint-enable no-unused-vars */

  const BACK_TO_WATCH_BTN_CLASS = '.bbmk3';
  const BACK_BTN_CLASS = '._3pcsu';
  const TABS_BTN_CLASS = '._1eVd- button';
  const STAR_NAME_SOLO_CLASS = '._1_AFq';
  const STAR_NAME_CLASS = '._2xcbh';
  const STAR_NAME_IN_LIST = '._3riIJ';

  window._lastViewedStarName = '';

  function getStarName() {
    let starName;
    let starNameEl = document.querySelector(STAR_NAME_SOLO_CLASS);
    if (!starNameEl) {
      starNameEl = document.querySelector(STAR_NAME_CLASS);
    }
    if (starNameEl) {
      starName = starNameEl.textContent.toLowerCase();
      window._lastViewedStarName = starName;
    }

    return starName;
  }

  let backBtn = document.querySelector(BACK_TO_WATCH_BTN_CLASS);
  if (backBtn) {
    getStarName();
    backBtn.click();
  } else {
    backBtn = document.querySelector(BACK_BTN_CLASS);

    if (!backBtn) { return; }

    const starName = getStarName();

    backBtn.click();

    const i = setInterval(() => {
      const tabs = document.querySelectorAll(TABS_BTN_CLASS);

      if (tabs && tabs.length) {
        tabs[1].click();

        if (starName) {
          setTimeout(() => {
            function scrollToBackStar() {
              const stars = document.querySelectorAll(STAR_NAME_IN_LIST);
              const starEl = [].find.call(
                stars || [], (el) => starName === el.textContent.toLowerCase(),
              );

              if (!starEl) { return false; }

              starEl
                .parentElement
                .parentElement
                .parentElement
                .parentElement
                .parentElement.scrollIntoView();
              document.documentElement.scrollTop -= 250;
              return starEl;
            }

            if (!scrollToBackStar()) {
              document.documentElement.scrollTop = document.documentElement.scrollHeight;
              const ii = setInterval(() => {
                if (scrollToBackStar()) { clearInterval(ii); }
              }, 50);
            }
          }, 50);
        }

        clearInterval(i);
      }
    }, 50);
  }
})();
