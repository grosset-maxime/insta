/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
(() => {
  /* eslint-disable no-unused-vars */
  const version = '1.0.0';
  const name = 'OfScroll';
  const shortcut = 'ctrl+0';
  /* eslint-enable no-unused-vars */

  const INTERVAL = 100;

  const OfScroll = window.OfScroll || false;

  if (!OfScroll) {
    window.OfScroll = setInterval(() => {
      if (!window.OfScroll) { return; }
      window.scrollTo(0, document.body.scrollHeight);
    }, INTERVAL);
  } else {
    clearInterval(OfScroll);
    window.OfScroll = null;
  }
})();
