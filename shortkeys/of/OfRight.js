/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
(() => {
  /* eslint-disable no-unused-vars */
  const version = '1.0.0';
  const name = 'OfRight';
  const shortcut = 'right';
  /* eslint-enable no-unused-vars */

  const NB_POST_EL_CLASS = '.b-profile__search__title';

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
    nbPostEl.style.color = 'black';
    nbPostEl.style['font-size'] = '20px';
    nbPostEl.style['z-index'] = '2000';
    nbPostEl.style.background = '#ffffff30';
    nbPostEl.style.padding = '3px 6px';
    nbPostEl.style['border-radius'] = '6px';

    nbPostEl.appendChild(nbRightEl);
    nbPostEl.innerHTML = `${nbPostEl.innerHTML} / ${totalNbPosts}`;
    document.body.appendChild(nbPostEl);

    nbPostEl = document.querySelector('.nbpost');
    nbRightEl = document.querySelector('.nbright');
  }

  nbRightEl.textContent = parseInt(nbRightEl.textContent || 1, 10) + 1;
})();
