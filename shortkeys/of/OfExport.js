/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
(() => {
  /* eslint-disable no-unused-vars */
  const version = '1.0.2';
  const name = 'OfExport';
  const shortcut = 'ctrl+down';
  /* eslint-enable no-unused-vars */

  window._of = window._of || [];

  const STAR_NAME_EL_CLASS = '.b-profile__names .g-user-username';
  const CHAT_STAR_NAME_EL_CLASS = '.b-chats__item.current .g-user-username';

  function save(content) {
    function getStarName() {
      let starNameEl = document.querySelector(STAR_NAME_EL_CLASS);
      if (!starNameEl) {
        starNameEl = document.querySelector(CHAT_STAR_NAME_EL_CLASS);
      }
      return starNameEl ? starNameEl.textContent.replace(/[/\\?%*:|"<>]/g, '').trim().substr(1) : '';
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
    const fileName = `of - ${getStarName()}.txt`;

    download(fileName, blob);
  }

  save(window._of.join('\n'));
})();
