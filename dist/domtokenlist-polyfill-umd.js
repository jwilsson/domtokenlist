/*! DOMTokenlist shim | Copyright 2016 Jonathan Wilsson and Bogdan Chadkin. */
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./domtokenlist-umd'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('./domtokenlist-umd'));
  } else {
    root.DOMTokenList = factory(root.DOMTokenList);
  }
}(this, function(DOMTokenList) {
;typeof window !== 'undefined' && (function (window) {
    'use strict';

    if (!window.DOMTokenList) {
        return;
    }

    var el = document.createElement('a').classList;
    var dtp = DOMTokenList.prototype;
    var add = dtp.add;
    var remove = dtp.remove;
    var toggle = dtp.toggle;

    el.add('c1', 'c2');

    // Older versions of the HTMLElement.classList spec didn't allow multiple
    // arguments, easy to test for
    var iterateArg = function (fn) {
        return function () {
            var tokens = arguments;
            var i;

            for (i = 0; i < tokens.length; i += 1) {
                fn.call(this, tokens[i]);
            }
        };
    };

    if (!el.contains('c2')) {
        dtp.add = iterateArg(add);
        dtp.remove = iterateArg(remove);
    }

    // Older versions of the spec didn't have a forcedState argument for
    // `toggle` either, test by checking the return value after forcing
    if (!el.toggle('c1', true)) {
        dtp.toggle = function (cls, force) {
            if (force === undefined) {
                return toggle.call(this, cls);
            }

            (force ? add : remove).call(this, cls);
            return !!force;
        };
    }
}(window));

;typeof window !== 'undefined' && (function () {
    'use strict';

    if ('classList' in document.createElement('a') && !window.QUnit) {
        return;
    }

    Object.defineProperty(Element.prototype, 'classList', {
        get: function () {
            return new DOMTokenList(this, 'className');
        }
    });
}());

;typeof window !== 'undefined' && (function () {
    'use strict';

    if ('relList' in document.createElement('a') && !window.QUnit) {
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
window.DOMTokenList = DOMTokenList;
return DOMTokenList;
}));
