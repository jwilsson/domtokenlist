;(function () {
    'use strict';

    if ('relList' in document.createElement('a')) {
        return;
    }

    Object.defineProperty(Element.prototype, 'relList', {
        get: function () {
            return new DOMTokenList(this, 'rel');
        }
    });
}());
