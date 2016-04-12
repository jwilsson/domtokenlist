;typeof window !== 'undefined' && (function () {
    'use strict';

    if ('relList' in document.createElement('a')) {
        return;
    }

    var i;
    var elements = [HTMLAnchorElement, HTMLAreaElement, HTMLLinkElement];
    var getter = function () {
        return new DOMTokenList(this, 'rel');
    };

    for (i = 0; i < elements.length; i++) {
        Object.defineProperty(elements[i].prototype, 'relList', {
            get: getter
        });
    }
}());
