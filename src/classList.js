;(function () {
    'use strict';

    Object.defineProperty(Element.prototype, 'classList', {
        get: function () {
            return new DOMTokenList(this, 'class');
        }
    });
}());
