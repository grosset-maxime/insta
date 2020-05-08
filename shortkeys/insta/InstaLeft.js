(() => {
    const version = '1.0.0';
    const name = 'InstaLeft';
    const shortcut = 'left';

    const nbRightEl = document.querySelector('.nbright');
    nbRightEl && (nbRightEl.textContent = parseInt(nbRightEl.textContent, 10) - 1);
})();