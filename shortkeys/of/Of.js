/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
(() => {
  /* eslint-disable no-unused-vars */
  const version = '1.0.1';
  const name = 'Of';
  const shortcut = 'ctrl+up';
  /* eslint-enable no-unused-vars */

  window._of = window._of || [];

  // const STAR_NAME_EL_CLASS = '.b-profile__names .g-user-username';
  const VIDEO_CTN_CLASS = '.vjs-tech';
  const IMG_CTN_CLASS = '.pswp__item';

  function push(src) {
    if (!window._of.find((a) => a === src)) {
      window._of.push(src);
    }
  }

  const imgs = document.querySelectorAll(`${IMG_CTN_CLASS} img`);
  (imgs || []).forEach((i) => {
    // if (i.classList.contains(UNWANTED_EL_CLASSES)) { return; }
    push(i.src);
    // highlight(i);
  });

  const vids = document.querySelectorAll(`${VIDEO_CTN_CLASS} source`);
  (vids || []).forEach((v) => {
    // if (v.classList.contains(UNWANTED_EL_CLASSES)) { return; }
    push(v.src);
    // highlight(v);
  });
})();
