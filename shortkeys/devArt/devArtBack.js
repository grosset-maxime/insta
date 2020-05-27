(() => {
  /* eslint-disable no-unused-vars */
  const version = '1.0.1';
  const name = 'DevArtBack';
  const shortcut = 'backspace';
  /* eslint-enable no-unused-vars */

  const BACK_TO_WATCH_BTN_CLASS = '._1JKQ8';
  const BACK_BTN_CLASS = '._3ngkd';
  const TABS_BTN_CLASS = '._2qipq';
  const STAR_NAME_CLASS = '._1FO8S';

  let backBtn = document.querySelector(BACK_TO_WATCH_BTN_CLASS);
  if (backBtn) {
    backBtn.click();
  } else {
    backBtn = document.querySelector(BACK_BTN_CLASS);

    if (backBtn) {
      let starName;

      const starNameEl = document.querySelector(STAR_NAME_CLASS);
      if (starNameEl) {
        starName = starNameEl.textContent.toLowerCase();
      }
      backBtn.click();

      const i = setInterval(() => {
        const tabs = document.querySelectorAll(TABS_BTN_CLASS);

        if (tabs && tabs.length) {
          tabs[1].click();

          if (starName) {
            setTimeout(() => {
              function scrollToBackStar() {
                const stars = document.querySelectorAll('._1n__p');
                const starEl = [].find.call(stars || [], (el) => starName === el.textContent.toLowerCase());

                if (!starEl) { return false; }

                starEl.parentElement.parentElement.parentElement.parentElement.parentElement.scrollIntoView();
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
  }
})();
