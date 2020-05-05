(() => {
    const version = '1.0.0';
    const name = 'InstaOpenVideoNewTab';
    const shortcut = 'ctrl+down';

    const POPUP_CTN_CLASS = '.PdwC2';

    const refRect = document.querySelectorAll(POPUP_CTN_CLASS)[0].getBoundingClientRect();
    const vidsCtn = document.querySelectorAll('.RzuR0');

    function openInNewTab (ctn) {
        ctn = ctn || document;
        window.open(ctn.getElementsByTagName('video')[0].src,'_blank');
    }

    vidsCtn.forEach(function (vidCtn) { 
        if (vidCtn.getBoundingClientRect().x === refRect.x) {
            openInNewTab(vidCtn);
        }
    });

    if (!vidsCtn.length) {
        openInNewTab();
    }
})();