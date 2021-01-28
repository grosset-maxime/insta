/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
(() => {
  /* eslint-disable no-unused-vars */
  const version = '1.0.0';
  const name = 'InstaOpenPostNewTab';
  const shortcut = 'ctrl+down';
  /* eslint-enable no-unused-vars */

  function openInNewTab(url) {
    window.open(url, '_blank');
  }

  const { href } = window.location;

  if (href.includes('/p/')) {
    openInNewTab(href);
  }
})();
