;typeof window !== 'undefined' && (function () {
    'use strict';

    // https://connect.microsoft.com/IE/feedback/details/1046039/classlist-not-working-on-svg-elements
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    if ('classList' in svg && !window.QUnit) {
        return;
    }

    Object.defineProperty(SVGElement.prototype, 'classList', {
        get: function () {
            if (typeof this.className === 'string') {
                return new DOMTokenList(this, 'className');
            }
            // in SVG world className may not be a DOMString, but a SVGAnimatedString
            // https://developer.mozilla.org/en-US/docs/Web/API/SVGAnimatedString
            if (typeof this.className.baseVal === 'string') {
                return new DOMTokenList(this.className, 'baseVal');
            }
        }
    });
}());
