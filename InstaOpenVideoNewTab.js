javascript:(function(){
    var name = 'InstaOpenVideoNewTab';
    var shortcut = 'ctrl+down';

    var POPUP_CTN_CLASS = '.PdwC2';
    var refRect = document.querySelectorAll(POPUP_CTN_CLASS)[0].getBoundingClientRect();
    var vidsCtn = document.querySelectorAll('.RzuR0');

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
}())