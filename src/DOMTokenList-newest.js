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
