/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
(() => {
  /* eslint-disable no-unused-vars */
  const version = '1.2.0';
  const name = 'Insta';
  const shortcut = 'ctrl+up';
  /* eslint-enable no-unused-vars */

  window._insta = window._insta || [];

  const POPUP_IMG_CTN_CLASS = '.ZyFrc';
  const POPUP_VID_CTN_CLASS = '._97aPb';
  const UNWANTED_EL_CLASSES = ['_6q-tv'];
  const STAR_NAME_EL_CLASS = '._7UhW9';
  const STAR_NAME_FROM_POST_EL_CLASS = '.e1e1d a';
  const VIDEO_CTN_CLASS = '.PyenC';

  const GRAPH_VIDEO = 'GraphVideo';
  const GRAPH_IMAGE = 'GraphImage';
  const GRAPH_MULTI_ITEM = 'GraphSidecar';

  function save(src, from) {
    function getFileName(url = '') {
      if (url.includes('?')) {
        url = url.substr(0, url.lastIndexOf('?'));
      }
      const m = url.match(/(?=(\w|-)+\.\w{3,4}$).+/);
      return m && m.length > 0 ? m[0] : '';
    }

    function getStarName() {
      const starNameEl = document.querySelector(STAR_NAME_EL_CLASS);
      return starNameEl ? starNameEl.textContent.replace(/[/\\?%*:|"<>]/g, '') : '';
    }

    function getStarNameFromPost() {
      const starNameEl = document.querySelector(STAR_NAME_FROM_POST_EL_CLASS);
      return starNameEl ? starNameEl.textContent.replace(/[/\\?%*:|"<>]/g, '') : '';
    }

    const url = src;
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const fileName = `${from === 'post' ? getStarNameFromPost() : getStarName()} - ${getFileName(url)}`;
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

  function push(src, from) {
    if (!window._insta.find((a) => a === src)) {
      window._insta.push(src);
      save(src, from);
    }
  }

  function highlight(el) {
    el.style.transition = '.4s';
    el.style.transform = 'scale(.98, .98)';
    el.style['box-shadow'] = '0px 0 35px red';
  }

  function copyInputText(inputText) {
    inputText.select();
    document.execCommand('copy');
    inputText.blur();
  }

  if (Object.keys(window.__additionalData).length) {
    Object.keys(window.__additionalData).forEach((id) => {
      const post = window.__additionalData[id].data.graphql.shortcode_media;
      const postType = post.__typename;

      if (postType === GRAPH_VIDEO) {
        push(post.video_url, 'post');
      } else if (postType === GRAPH_MULTI_ITEM) {
        post.edge_sidecar_to_children.edges
          .map((edge) => {
            const item = edge.node;
            const itemType = item.__typename;
            let src;

            if (itemType === GRAPH_VIDEO) {
              src = item.video_url;
            }

            return src;
          })
          .filter((src) => src)
          .forEach((src) => { push(src, 'post'); });
      }
    });
    return;
  }

  if (!window._sharedData.entry_data.ProfilePage) {
    // eslint-disable-next-line no-alert
    window.alert('Reload page enable download. There is no: window._sharedData.entry_data.ProfilePage');
    return;
  }

  let hasFoundPost = false;
  window._sharedData.entry_data.ProfilePage.forEach((page) => {
    let post = page.graphql.user.edge_owner_to_timeline_media.edges
      .find((edge) => window.location.pathname.includes(edge.node.shortcode));

    post = (post || {}).node;

    if (!post) {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = window.location.href;
      document.body.appendChild(input);

      setTimeout(() => { copyInputText(input); });
      copyInputText(input);

      console.log('Post not found!');
      return;
    }

    hasFoundPost = true;

    const postType = post.__typename;

    if (postType === GRAPH_VIDEO) {
      push(post.video_url);
    } else if (postType === GRAPH_IMAGE) {
      push(post.display_url);
    } else if (postType === GRAPH_MULTI_ITEM) {
      post.edge_sidecar_to_children.edges
        .map((edge) => {
          const item = edge.node;
          const itemType = item.__typename;
          let src;

          if (itemType === GRAPH_VIDEO) {
            src = item.video_url;
          } else if (itemType === GRAPH_IMAGE) {
            src = item.display_url;
          }
          return src;
        })
        .filter((src) => src)
        .forEach((src) => { push(src); });
    }
  });

  const imgs = document.querySelectorAll(`${POPUP_IMG_CTN_CLASS} img`);
  (imgs || []).forEach((i) => {
    if (i.classList.contains(UNWANTED_EL_CLASSES)) { return; }
    if (!hasFoundPost) {
      push(i.src);
    }
    highlight(i);
  });

  const vids = document.querySelectorAll(`${POPUP_VID_CTN_CLASS} video`);
  (vids || []).forEach((v) => {
    if (v.classList.contains(UNWANTED_EL_CLASSES)) { return; }
    highlight(v);
  });

  const vidsThumb = document.querySelectorAll(VIDEO_CTN_CLASS);
  (vidsThumb || []).forEach((vt) => { highlight(vt); });
})();
