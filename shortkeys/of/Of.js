/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
(() => {
  /* eslint-disable no-unused-vars */
  const version = '1.0.2';
  const name = 'Of';
  const shortcut = 'ctrl+up';
  /* eslint-enable no-unused-vars */

  window._of = window._of || [];

  const VIDEO_CTN_CLASS = '.vjs-tech';
  const IMG_CTN_CLASS = '.pswp__item';

  function push(src) {
    if (!window._of.find((a) => a === src)) {
      window._of.push(src);
    }
  }

  function highlight(el) {
    el.style.transition = '.4s';
    el.style.transform = 'scale(.98, .98)';
    el.style['box-shadow'] = '0px 0 35px red';
  }

  // const refRect = document.querySelectorAll(POPUP_CTN_CLASS)[0].getBoundingClientRect();

  const imgs = document.querySelectorAll(`${IMG_CTN_CLASS} img`);
  (imgs || []).forEach((i) => {
    // if (i.classList.contains(UNWANTED_EL_CLASSES)) { return; }
    const rect = i.getBoundingClientRect();
    if (rect.x >= 0 && rect.x < document.body.clientWidth) {
      push(i.src);
      highlight(i);
    }
  });

  const vids = document.querySelectorAll(`${VIDEO_CTN_CLASS} source`);
  (vids || []).forEach((v) => {
    // if (v.classList.contains(UNWANTED_EL_CLASSES)) { return; }
    push(v.src);
    highlight(v.parentElement);
  });
})();
