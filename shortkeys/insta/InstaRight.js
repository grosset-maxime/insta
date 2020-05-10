(() => {
  /* eslint-disable no-unused-vars */
  const version = '1.1.0';
  const name = 'InstaRight';
  const shortcut = 'right';
  /* eslint-enable no-unused-vars */

  const POPUP_CTN_OVERLAY_CLASS = '._2dDPU';
  const POPUP_CTN_CLASS = '.PdwC2';
  const STAR_NAME_EL_CLASS = '._7UhW9';
  const NB_POST_EL_CLASS = '.g47SY';
  const BTN_EL_CLASS = '._8-yf5';
  const COMMENTS_CLASS = '.EtaWk';
  const CARROUSEL_DOT_CLASS = '.Yi5aA';

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

    const classes = [POPUP_CTN_CLASS, '.M9sTE', '._97aPb', '.rQDP3', '.ekfSF', '.EcJQs', '.kPFhm', `${POPUP_CTN_CLASS} .KL4Bh`, '.RzuR0'];
    const MARGING_TOP = 45;
    const styles = `{ height: calc(100vh - ${MARGING_TOP}px) !important; overflow: hidden !important; }`;

    const sheet = document.styleSheets[0];
    sheet.insertRule(`${BTN_EL_CLASS}[aria-label="Unlike"] { transform: scale(10); }`, 0);
    sheet.insertRule(`${BTN_EL_CLASS}[aria-label="Je n’aime plus"] { transform: scale(10); }`, 0);
    sheet.insertRule(`${STAR_NAME_EL_CLASS} { cursor: pointer; transition: .4s; }`, 0);
    sheet.insertRule(`${STAR_NAME_EL_CLASS}.clicked { transform: scale(2); }`, 0);
    sheet.insertRule(`${POPUP_CTN_OVERLAY_CLASS} { overflow: hidden; }`, 0);
    sheet.insertRule(`${POPUP_CTN_CLASS}${POPUP_CTN_CLASS} { max-width: none !important; width: 100%; margin: 0; }`, 0);
    sheet.insertRule(`${POPUP_CTN_CLASS} .KL4Bh .FFVAD, ._8jZFn { object-fit: contain !important; background: #000; }`, 0);
    sheet.insertRule(`${POPUP_CTN_CLASS} .KL4Bh, .kPFhm, .RzuR0 { padding-bottom: 0 !important; }`, 0);
    sheet.insertRule(`${COMMENTS_CLASS} { order: 10 !important; }`, 0);
    sheet.insertRule(`${classes.join(',')} ${styles}`, 0);
    sheet.insertRule('.zZYga { height: 100vh !important; overflow: hidden !important; }', 0);
    sheet.insertRule(`${CARROUSEL_DOT_CLASS} { box-shadow: 0px 0 5px #000; }`, 0);

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
