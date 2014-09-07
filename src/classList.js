;(function () {
    'use strict';

    if ('relList' in document.createElement('a')) {
        return;
    }

    Object.defineProperty(Element.prototype, 'classList', {
        get: function () {
            return new DOMTokenList(this, 'class');
        }
    });
}());
