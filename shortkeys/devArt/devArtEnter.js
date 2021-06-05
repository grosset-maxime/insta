/* eslint-disable no-underscore-dangle */
(() => {
  /* eslint-disable no-unused-vars */
  const version = '1.0.1';
  const name = 'DevArtEnter';
  const shortcut = 'enter';
  /* eslint-enable no-unused-vars */

  const WATCH_SECTION_CLASS = '._3fxzN';

  const watchSection = document.querySelector(WATCH_SECTION_CLASS);
  if (watchSection) {
    let link = watchSection.querySelector('a[data-hook="deviation_link"]');
    if (!link) {
      link = watchSection.querySelector('div[role="link"]');
    }
    if (link) {
      link.click();
    }
  }

  const initOnce = document.body.classList.contains('init-devart');
  if (!initOnce) {
    const POPOVER_CLASS = '._2Ppd-';
    const THUMB_INFOS_CLASS = '.JxeKq,.paUD_';
    const NAV_CONTROLS_ITEM_CTN_CLASS = '._1-XUr';

    document.body.classList.add('init-devart');

    const styleEl = document.createElement('style');
    document.head.appendChild(styleEl);
    const styleSheet = styleEl.sheet;

    styleSheet.insertRule(`${POPOVER_CLASS} { display: none; }`, styleSheet.cssRules.length);
    styleSheet.insertRule(`${THUMB_INFOS_CLASS} { visibility: visible; }`, styleSheet.cssRules.length);
    styleSheet.insertRule(`${NAV_CONTROLS_ITEM_CTN_CLASS} { opacity: 1; }`, styleSheet.cssRules.length);
  }
})();
