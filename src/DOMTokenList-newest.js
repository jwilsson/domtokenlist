;(function () {
    'use strict';

    if (!('DOMTokenList' in window)) {
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
            var args = arguments;
            var i, max;

            for(i = 0, max = args.length; i < max; i += 1) {
                fn.call(this, args[i]);
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

            (force ? add : rem).call(this, cls);
            return !!force;
        };
    }

} ());