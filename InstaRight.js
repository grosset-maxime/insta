javascript:(function () {
    var name = 'InstaRight';
    var shortcut = 'right';

    function copyInputText (inputText) {
        inputText.select();
        document.execCommand('copy');
        inputText.blur();
    }

    var nbPostEl = document.querySelector('.nbpost');
    var nbRightEl = document.querySelector('.nbright');

    if (!nbPostEl) {
        var totalNbPosts = (document.querySelector('.g47SY') || {}).textContent || '';

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
        nbPostEl.innerHTML = nbPostEl.innerHTML + ' / ' + totalNbPosts;
        document.body.appendChild(nbPostEl);

        nbPostEl = document.querySelector('.nbpost');
        nbRightEl = document.querySelector('.nbright');
    }

    nbRightEl.textContent = parseInt(nbRightEl.textContent || 0, 10) + 1;
    

    var initOnce = document.body.classList.contains('init-insta-right');

    if (!initOnce) {
        document.body.classList.add('init-insta-right');

        var sheet = document.styleSheets[0];
        sheet.insertRule('._8-yf5[aria-label="Unlike"] { transform: scale(10); }', 0);
        sheet.insertRule('.ekfSF.ekfSF { overflow: hidden; }', 0);
        sheet.insertRule('._7UhW9 { cursor: pointer; transition: .4s; }', 0);
        sheet.insertRule('._7UhW9.clicked { transform: scale(2); }', 0);
    
        var starNameEl = document.querySelector('._7UhW9');
        if (starNameEl) {
            starNameEl.addEventListener('click', function () {
                this.classList.add('clicked');
                var input = document.createElement('input');
                input.type = 'text';
                input.value = this.textContent
                document.body.appendChild(input);
    
                setTimeout(function () { copyInputText(input) });
                copyInputText(input);
            });
        }
    }
}());