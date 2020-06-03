/* eslint-disable no-underscore-dangle */
(() => {
  /* eslint-disable no-unused-vars */
  const version = '1.0.0';
  const name = 'DevArtEnter';
  const shortcut = 'enter';
  /* eslint-enable no-unused-vars */

  const WATCH_SECTION_CLASS = '._3KMiG';

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
    const THUMB_INFOS_CLASS = '.UR1Kt';
    const CONTROLS_ITEM_CTN_CLASS = '._2Xd68';

    document.body.classList.add('init-devart');

    const styleEl = document.createElement('style');
    document.head.appendChild(styleEl);
    const styleSheet = styleEl.sheet;

    styleSheet.insertRule(`${POPOVER_CLASS} { display: none; }`, styleSheet.cssRules.length);
    styleSheet.insertRule(`${THUMB_INFOS_CLASS} { visibility: visible; }`, styleSheet.cssRules.length);
    styleSheet.insertRule(`${CONTROLS_ITEM_CTN_CLASS} { opacity: 1; }`, styleSheet.cssRules.length);
  }
})();
