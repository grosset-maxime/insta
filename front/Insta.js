(() => {
    const version = '1.0.1';
    const name = 'Insta';
    const shortcut = 'ctrl+up';

    window._insta = window._insta || [];

    const POPUP_CTN_CLASS = '.PdwC2';
    const POPUP_IMG_CTN_CLASS = '.ZyFrc';
    const POPUP_VID_CTN_CLASS = '._97aPb';
    const UNWANTED_EL_CLASSES = ['_6q-tv'];
    const STAR_NAME_EL_CLASS = '._7UhW9';

    function push (src) {
        if (!window._insta.find((a) => { return a === src; })) {
            window._insta.push(src);
            save(src);
        }
    }

    function highlight (el) {
        el.style.transition = '.4s';
        el.style.transform = 'scale(.98, .98)';
        el.style['box-shadow'] = '0px 0 35px red';
    }

    function openInNewTabs () {
        window._insta.forEach((src) => {
            window.open(src, '_blank');
        });
    }

    function copyInputText (inputText) {
        inputText.select();
        document.execCommand('copy');
        inputText.blur();
    }

    function save(src) {

        function getFileName(url = '') {
            var m = url.toString().match(/.*\/(.+?)\./);
            return m && m.length > 1 ? m[1] : '';
        }

        function getStarName () {
            var starNameEl = document.querySelector(STAR_NAME_EL_CLASS);
            return starNameEl ? starNameEl.textContent.replace(/[/\\?%*:|"<>]/g, '') : '';
        }
        
        const url = src;
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const fileName = `${getStarName()} - ${getFileName(url)}`;
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

    const imgs = document.querySelectorAll(POPUP_IMG_CTN_CLASS + ' img');
    (imgs || []).forEach((i) => {
        if (i.classList.contains(UNWANTED_EL_CLASSES)) { return; }
        push(i.src);
        highlight(i);
    });

    const vids = document.querySelectorAll(POPUP_VID_CTN_CLASS + ' video');
    (vids || []).forEach((v) => {
        if (v.classList.contains(UNWANTED_EL_CLASSES)) { return; }
        push(v.src);
        highlight(v);
    });

    // var likeBtn = document.querySelector(POPUP_CTN_CLASS + ' .fr66n button');

    // if (likeBtn) {
        // var isFilled = false;

        // likeBtn.querySelector('span').classList.forEach(function (c) {
            // if (c.indexOf('filled') >= 0) {
                // isFilled = true;
            // }
        // });

        // !isFilled && likeBtn.click();
    // }

    let itemsListInput = document.querySelector('.items-list');
    let openInNewTabBtn = document.querySelector('.open-in-new-tab-btn');

    if (!itemsListInput) {
        itemsListInput = document.createElement('input');
        itemsListInput.type = 'text';
        itemsListInput.style.position = 'fixed';
        itemsListInput.style.left = '10px';
        itemsListInput.style.bottom = '10px';
        itemsListInput.style.width = '90%';
        itemsListInput.style['z-index'] = '10';
        itemsListInput.classList.add('items-list');
        itemsListInput.addEventListener('click', () => {
            setTimeout(() => { copyInputText(itemsListInput) });
            copyInputText(itemsListInput);
        });

        openInNewTabBtn = document.createElement('input');
        openInNewTabBtn.type = 'button';
        openInNewTabBtn.style.position = 'fixed';
        openInNewTabBtn.style.left = '10px';
        openInNewTabBtn.style.bottom = '40px';
        openInNewTabBtn.style.cursor = 'pointer';
        openInNewTabBtn.style['z-index'] = '10';
        openInNewTabBtn.classList.add('open-in-new-tab-btn');
        openInNewTabBtn.addEventListener('click', openInNewTabs);

        document.body.appendChild(openInNewTabBtn);
        document.body.appendChild(itemsListInput);
    }

    openInNewTabBtn.value = 'Open ' + window._insta.length + ' items in new tabs'
    itemsListInput.value = window._insta.join(' ');
})();