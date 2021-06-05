/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
(() => {
  /* eslint-disable no-unused-vars */
  const version = '1.0.5';
  const name = 'DevArt';
  const shortcut = 'ctrl+up';
  /* eslint-enable no-unused-vars */

  window._devart = window._devart || [];

  const STAR_NAME_EL_CLASS = '._1_AFq';
  const STAR_NAME_SOLO_EL_CLASS = '.g5Yvc';
  const IMG_CLASS = '._2PO4o';
  const IMG_SOLO_CLASS = '._1izoQ';
  const VID_CLASS = '._2ofkh';
  const VID_SOLO_CLASS = '._1ihrg';
  const DL_BTN_CLASS = 'a[data-hook="download_button"]';

  function save(src) {
    function getFileName(url = '') {
      if (url.includes('?')) {
        url = url.substr(0, url.lastIndexOf('?'));
      }
      const m = url.match(/(?=(\w|-)+\.\w{3,4}$).+/);
      return m && m.length > 0 ? m[0] : '';
    }

    function getStarName() {
      let starNameEl = document.querySelector(STAR_NAME_EL_CLASS);
      if (!starNameEl) {
        starNameEl = document.querySelector(STAR_NAME_SOLO_EL_CLASS);
      }
      return starNameEl ? starNameEl.textContent.replace(/[/\\?%*:|"<>]/g, '') : '';
    }

    const starName = getStarName();
    const url = src;
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const fileName = `${starName} - ${getFileName(url)}`;
        const objectUrl = window.URL.createObjectURL(blob);

        const a = document.createElement('a');

        a.href = objectUrl;
        a.download = fileName || 'download';

        const clickHandler = () => {
          setTimeout(() => {
            URL.revokeObjectURL(objectUrl);
            this.removeEventListener('click', clickHandler);
          }, 150);
        };

        a.addEventListener('click', clickHandler, false);

        a.click();

        return a;
      });
  }

  function push(src) {
    if (!window._devart.find((a) => a === src)) {
      window._devart.push(src);
      save(src);
    }
  }

  function highlight(el) {
    el.style.transition = '.4s';
    el.style.transform = 'scale(.98, .98)';
    el.style['box-shadow'] = '0px 0 35px red';
  }

  const downloadBtn = document.querySelector(DL_BTN_CLASS);
  let hasDlBtn = false;

  if (downloadBtn) {
    downloadBtn.click();
    // push(downloadBtn.href);
    hasDlBtn = true;
  }

  let img = document.querySelector(`img${IMG_CLASS}`);
  if (!img) {
    img = document.querySelector(`img${IMG_SOLO_CLASS}`);
  }
  if (img) {
    if (!hasDlBtn) { push(img.src); }
    highlight(img);
  }

  let vidCtn = document.querySelector(`${VID_CLASS}`);
  if (!vidCtn) {
    vidCtn = document.querySelector(`${VID_SOLO_CLASS}`);
  }
  if (vidCtn) {
    if (!hasDlBtn) {
      const vid = vidCtn.querySelector('video');
      if (vid) { push(vid.src); }
    }
    highlight(vidCtn);
  }
})();
