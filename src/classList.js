;typeof window !== 'undefined' && (function () {
    'use strict';

    if ('classList' in document.createElement('a')) {
        return;
    }

    Object.defineProperty(Element.prototype, 'classList', {
        get: function () {
            return new DOMTokenList(this, 'className');
        }
    });
}());
