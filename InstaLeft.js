javascript:(function () {
    var name = 'InstaLeft';
    var shortcut = 'left';

    var nbRightEl = document.querySelector('.nbright');
    nbRightEl && (nbRightEl.textContent = parseInt(nbRightEl.textContent, 10) - 1);
}());