/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
(() => {
  /* eslint-disable no-unused-vars */
  const version = '1.1.0';
  const name = 'OfRight';
  const shortcut = 'right';
  /* eslint-enable no-unused-vars */

  const NB_POST_EL_CLASS = '.b-profile__search__title';
  const POST_EL_CLASS = '.b-post';

  function debounce(func, timeout = 90) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  let nbPostEl = document.querySelector('.nbpost');
  let nbRightEl = document.querySelector('.nbright');
  let nbPostLoadedEl = document.querySelector('.nbpostloaded');
  let nbRightLoadedEl = document.querySelector('.nbrightloaded');

  function runOnScroll() {
    const posts = document.querySelectorAll(POST_EL_CLASS);

    if (!window._postIdSet) {
      window._postIdSet = new Set();
    }

    posts.forEach((el) => { window._postIdSet.add(el.id); });
    nbRightLoadedEl.textContent = window._postIdSet.size;
  }

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

  if (!nbPostLoadedEl) {
    const totalNbPosts = (document.querySelector(NB_POST_EL_CLASS) || {}).textContent || '';

    nbPostLoadedEl = document.createElement('span');
    nbPostLoadedEl.classList.add('nbpostloaded');

    nbRightLoadedEl = document.createElement('span');
    nbRightLoadedEl.classList.add('nbrightloaded');

    nbPostLoadedEl.style.position = 'fixed';
    nbPostLoadedEl.style.left = '10px';
    nbPostLoadedEl.style.top = '40px';
    nbPostLoadedEl.style.color = 'black';
    nbPostLoadedEl.style['font-size'] = '20px';
    nbPostLoadedEl.style['z-index'] = '2000';
    nbPostLoadedEl.style.background = '#ffffff30';
    nbPostLoadedEl.style.padding = '3px 6px';
    nbPostLoadedEl.style['border-radius'] = '6px';

    nbPostLoadedEl.appendChild(nbRightLoadedEl);
    nbPostLoadedEl.innerHTML = `${nbPostLoadedEl.innerHTML} / ${totalNbPosts}`;
    document.body.appendChild(nbPostLoadedEl);

    nbPostLoadedEl = document.querySelector('.nbpostloaded');
    nbRightLoadedEl = document.querySelector('.nbrightloaded');

    const debounced = debounce(() => runOnScroll());
    window.addEventListener('scroll', debounced, { passive: true });
  }

  nbRightEl.textContent = parseInt(nbRightEl.textContent || 1, 10) + 1;
})();
