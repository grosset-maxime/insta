(() => {
  /* eslint-disable no-unused-vars */
  const version = '1.0.0';
  const name = 'InstaRight';
  const shortcut = 'right';
  /* eslint-enable no-unused-vars */

  const STAR_NAME_EL_CLASS = '._7UhW9';
  const NB_POST_EL_CLASS = '.g47SY';
  const BTN_EL_CLASS = '._8-yf5';

  function copyInputText(inputText) {
    inputText.select();
    document.execCommand('copy');
    inputText.blur();
  }

  let nbPostEl = document.querySelector('.nbpost');
  let nbRightEl = document.querySelector('.nbright');

  if (!nbPostEl) {
    const totalNbPosts = (document.querySelector(NB_POST_EL_CLASS) || {}).textContent || '';

    nbPostEl = document.createElement('span');
    nbPostEl.classList.add('nbpost');

    nbRightEl = document.createElement('span');
    nbRightEl.classList.add('nbright');

    nbPostEl.style.position = 'fixed';
    nbPostEl.style.left = '10px';
    nbPostEl.style.top = '10px';
    nbPostEl.style.color = 'white';
    nbPostEl.style['font-size'] = '20px';
    nbPostEl.style['z-index'] = '10';

    nbPostEl.appendChild(nbRightEl);
    nbPostEl.innerHTML = `${nbPostEl.innerHTML} / ${totalNbPosts}`;
    document.body.appendChild(nbPostEl);

    nbPostEl = document.querySelector('.nbpost');
    nbRightEl = document.querySelector('.nbright');
  }

  nbRightEl.textContent = parseInt(nbRightEl.textContent || 1, 10) + 1;


  const initOnce = document.body.classList.contains('init-insta-right');

  if (!initOnce) {
    document.body.classList.add('init-insta-right');

    const sheet = document.styleSheets[0];
    sheet.insertRule(`${BTN_EL_CLASS}[aria-label="Unlike"] { transform: scale(10); }`, 0);
    sheet.insertRule(`${BTN_EL_CLASS}[aria-label="Je n’aime plus"] { transform: scale(10); }`, 0);
    // sheet.insertRule('.ekfSF.ekfSF { overflow: hidden; }', 0);
    sheet.insertRule(`${STAR_NAME_EL_CLASS} { cursor: pointer; transition: .4s; }`, 0);
    sheet.insertRule(`${STAR_NAME_EL_CLASS}.clicked { transform: scale(2); }`, 0);

    const starNameEl = document.querySelector(STAR_NAME_EL_CLASS);
    if (starNameEl) {
      starNameEl.addEventListener('click', () => {
        starNameEl.classList.add('clicked');
        const input = document.createElement('input');
        input.type = 'text';
        input.value = starNameEl.textContent;
        document.body.appendChild(input);

        setTimeout(() => { copyInputText(input); });
        copyInputText(input);
      });
    }
  }
})();
