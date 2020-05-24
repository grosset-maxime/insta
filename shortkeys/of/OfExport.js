/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
(() => {
  /* eslint-disable no-unused-vars */
  const version = '1.0.0';
  const name = 'OfExport';
  const shortcut = 'ctrl+down';
  /* eslint-enable no-unused-vars */

  window._of = window._of || [];

  const STAR_NAME_EL_CLASS = '.b-profile__names .g-user-username';

  function save(content) {
    function getStarName() {
      const starNameEl = document.querySelector(STAR_NAME_EL_CLASS);
      return starNameEl ? starNameEl.textContent.replace(/[/\\?%*:|"<>]/g, '') : '';
    }

    function download(fileName, blob) {
      const objectUrl = window.URL.createObjectURL(blob);

      const a = document.createElement('a');

      a.href = objectUrl;
      a.download = fileName;

      const clickHandler = () => {
        setTimeout(() => {
          URL.revokeObjectURL(objectUrl);
          this.removeEventListener('click', clickHandler);
        }, 150);
      };

      a.addEventListener('click', clickHandler, false);

      a.click();
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const fileName = `${getStarName()}.txt`;

    download(fileName, blob);
  }

  save(window._of.join('\n'));
})();
