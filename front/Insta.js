javascript:(function(){
    var name = 'Insta';
    var shortcut = 'ctrl+up';

    window._insta = window._insta || [];

    function push (src) {
        if (!window._insta.find(function (a) { return a === src; })) {
            window._insta.push(src);
        }
    }

    function highlight (el) {
        el.style.transition = '.4s';
        el.style.transform = 'scale(.98, .98)';
        el.style['box-shadow'] = '0px 0 35px red';
    }

    function openInNewTabs () {
        window._insta.forEach(function (src) {
            window.open(src, '_blank');
        });
    }

    function copyInputText (inputText) {
        inputText.select();
        document.execCommand('copy');
        inputText.blur();
    }

    var POPUP_CTN_CLASS = '.PdwC2';
    var POPUP_IMG_CTN_CLASS = '.ZyFrc';
    var UNWANTED_EL_CLASSES = ['_6q-tv'];
    var imgs = document.querySelectorAll(POPUP_IMG_CTN_CLASS + ' img');

    (imgs || []).forEach(function (i) {
        if (i.classList.contains(UNWANTED_EL_CLASSES)) { return; }
        push(i.src);
        highlight(i);
    });

    var vids = document.querySelectorAll(POPUP_IMG_CTN_CLASS + ' video');

    (vids || []).forEach(function (v) {
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

    var itemsListInput = document.querySelector('.items-list');
    var openInNewTabBtn = document.querySelector('.open-in-new-tab-btn');

    if (!itemsListInput) {
        itemsListInput = document.createElement('input');
        itemsListInput.type = 'text';
        itemsListInput.style.position = 'fixed';
        itemsListInput.style.left = '10px';
        itemsListInput.style.bottom = '10px';
        itemsListInput.style.width = '90%';
        itemsListInput.style['z-index'] = '10';
        itemsListInput.classList.add('items-list');
        itemsListInput.addEventListener('click', function () {
            setTimeout(function () { copyInputText(itemsListInput) });
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

    openInNewTabBtn.value = 'Open ' + window._insta.length + '/30 items in new tabs'
    itemsListInput.value = window._insta.join(' ');
}());