/* eslint-disable no-underscore-dangle */
(() => {
  /* eslint-disable no-unused-vars */
  const version = '1.0.4';
  const name = 'DevArtBack';
  const shortcut = 'backspace';
  /* eslint-enable no-unused-vars */

  const BACK_TO_WATCH_BTN_CLASS = '._1JKQ8';
  const BACK_BTN_CLASS = '._3ngkd';
  const TABS_BTN_CLASS = '._2qipq';
  const STAR_NAME1_CLASS = '._1FO8S';
  const STAR_NAME2_CLASS = '._2YW0c';
  const STAR_NAME_IN_LIST = '._1HHLq';

  window._lastViewedStarName = '';

  function getStarName() {
    let starName;
    let starNameEl = document.querySelector(STAR_NAME1_CLASS);
    if (!starNameEl) {
      starNameEl = document.querySelector(STAR_NAME2_CLASS);
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

  const initOnce = document.body.classList.contains('init-devart');
  if (!initOnce) {
    const POPOVER_CLASS = '._2Ppd-';
    const THUMB_INFOS_CLASS = '.UR1Kt';

    document.body.classList.add('init-devart');

    const styleEl = document.createElement('style');
    document.head.appendChild(styleEl);
    const styleSheet = styleEl.sheet;

    styleSheet.insertRule(`${POPOVER_CLASS} { display: none; }`, styleSheet.cssRules.length);
    styleSheet.insertRule(`${THUMB_INFOS_CLASS} { visibility: visible; }`, styleSheet.cssRules.length);
  }
})();
