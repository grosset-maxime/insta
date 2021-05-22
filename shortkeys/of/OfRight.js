/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
(() => {
  /* eslint-disable no-unused-vars */
  const version = '1.1.1';
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
  const urlPathname = window.location.pathname;
  const isTabPhotos = urlPathname.lastIndexOf('/photos') > 0;
  const isTabVideos = urlPathname.lastIndexOf('/videos') > 0;

  function runOnScroll() {
    if (isTabPhotos || isTabVideos) { return; }

    const posts = document.querySelectorAll(POST_EL_CLASS);

    if (!window._postIdSet) {
      window._postIdSet = new Set();
    }

    posts.forEach((el) => { window._postIdSet.add(el.id); });
    nbRightEl.textContent = window._postIdSet.size;
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

  if (isTabPhotos || isTabVideos) {
    if (window._countNbLoadedPostsOnScroll) {
      window.removeEventListener('scroll', window._countNbLoadedPostsOnScroll);
      delete window._countNbLoadedPostsOnScroll;
      nbRightEl.textContent = '1';
    }

    nbRightEl.textContent = parseInt(nbRightEl.textContent || 1, 10) + 1;
  } else if (!window._countNbLoadedPostsOnScroll) {
    window._countNbLoadedPostsOnScroll = debounce(() => runOnScroll());
    window.addEventListener('scroll', window._countNbLoadedPostsOnScroll, { passive: true });
  }
})();
