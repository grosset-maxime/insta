(() => {
  /* eslint-disable no-unused-vars */
  const version = '1.0.0';
  const name = 'InstaPlayVideo';
  const shortcut = 'ctrl+down';
  /* eslint-enable no-unused-vars */

  const POPUP_CTN_CLASS = '.PdwC2';
  const VIDEO_CLASS = '.fXIG0';
  const VIDEO_CTN_CLASS = '.RzuR0';

  function playVideo(ctn = document) {
    ctn.querySelector(VIDEO_CLASS).click();
  }

  const refRect = document.querySelectorAll(POPUP_CTN_CLASS)[0].getBoundingClientRect();
  const vidsCtn = document.querySelectorAll(VIDEO_CTN_CLASS);

  vidsCtn.forEach((vidCtn) => {
    if (vidCtn.getBoundingClientRect().x === refRect.x) {
      playVideo(vidCtn);
    }
  });

  if (!vidsCtn.length) {
    playVideo();
  }
})();
