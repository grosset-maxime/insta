/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
(() => {
  /* eslint-disable no-unused-vars */
  const version = '1.0.0';
  const name = 'Ph';
  const shortcut = 'ctrl+up';
  /* eslint-enable no-unused-vars */

  function copyInputText(inputText) {
    inputText.select();
    document.execCommand('copy');
    inputText.blur();
  }

  const media = window.media_0;

  const input = document.createElement('input');
  input.type = 'text';
  document.body.appendChild(input);

  fetch(media)
    .then((response) => response.json())
    .then((array) => {
      const info = array[array.length - 1];
      const { videoUrl } = info;
      console.log(videoUrl);
      input.value = videoUrl;
      setTimeout(() => { copyInputText(input); });
      copyInputText(input);
    });
})();
