/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
(() => {
  /* eslint-disable no-unused-vars */
  const version = '1.0.4';
  const name = 'Of';
  const shortcut = 'ctrl+up';
  /* eslint-enable no-unused-vars */

  window._of = window._of || [];

  const VIDEO_CTN_CLASS = '.vjs-tech';
  const GIF_CTN_CLASS = '.post_gif_media';
  const IMG_CTN_CLASS = '.pswp__item';

  function hasPushSrc(src) {
    return window._of.find((a) => a === src);
  }

  function push(src) {
    if (!hasPushSrc(src)) {
      window._of.push(src);
    }
  }

  function highlight(el, src) {
    el.style.transition = '.4s';
    el.style.transform = 'scale(.98, .98)';
    const shadowColor = hasPushSrc(src) ? 'aqua' : 'red';
    el.style['box-shadow'] = `0 0 35px ${shadowColor}`;
  }

  function isInScreen(el) {
    let inScreen = true;
    const rect = el.getBoundingClientRect();
    const rectYMid = rect.y + rect.height / 2;

    if (rectYMid < 0 || rectYMid > window.innerHeight) { inScreen = false; }
    if (!inScreen || rect.x < 0 || rect.x + rect.width > window.innerWidth) { inScreen = false; }

    return inScreen;
  }

  function iterateVids(vids, isGif = false) {
    (vids || []).forEach((v) => {
      // if (v.classList.contains(UNWANTED_EL_CLASSES)) { return; }

      const label = v.getAttribute('label');
      if (label) {
        if (label !== 'original') { return; }
        if (!isInScreen(v.parentElement)) { return; }
      }

      if (isGif) {
        if (!isInScreen(v.parentElement)) { return; }
      }

      highlight(v.parentElement, v.src);
      push(v.src);
    });
  }

  const imgs = document.querySelectorAll(`${IMG_CTN_CLASS} img`);
  (imgs || []).forEach((i) => {
    // if (i.classList.contains(UNWANTED_EL_CLASSES)) { return; }
    const rect = i.getBoundingClientRect();
    if (rect.x >= 0 && rect.x < window.innerWidth) {
      highlight(i, i.src);
      push(i.src);
    }
  });

  const vids = document.querySelectorAll(`${VIDEO_CTN_CLASS} source`);
  iterateVids(vids);

  const gifs = document.querySelectorAll(`${GIF_CTN_CLASS} source`);
  iterateVids(gifs, true);
})();
