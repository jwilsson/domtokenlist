/*! DOMTokenlist shim | Copyright 2015 Jonathan Wilsson and contributors. */
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
;(function (window) {
    'use strict';

    if ('DOMTokenList' in window && !window.QUnit) {
        return;
    }

    var arr = [];

    var inArray = function (array, value) {
        var i;

        if (arr.indexOf) {
            return arr.indexOf.call(array, value);
        }

        for (i = 0; i < array.length; i++) {
            if (array[i] === value) {
                return i;
            }
        }

        return -1;
    };

    var toArray = function (object) {
        return arr.slice.call(object);
    };

    var validateToken = function (token) {
        var whitespace = /[\u0009\u000A\u000C\u000D\u0020]/;

        if (token === '' || whitespace.test(token)) {
            throw new Error('Token must not be empty or contain whitespace.');
        }
    };

    var DOMTokenList = function (element, prop) {
        var i;
        var values = [];

        if (element && prop) {
            this.element = element;
            this.prop = prop;

            values = element[prop];
            if (values) {
                values = values.replace(/^\s+|\s+$/g,'').split(/\s+/);

                for (i = 0; i < values.length; i++) {
                    this[i] = values[i];
                }
            } else {
                values = [];
            }
        }

        this.length = values.length;
    };

    DOMTokenList.prototype.add = function () {
        var i;
        var tokens = toArray(arguments);

        for (i = 0; i < tokens.length; i++) {
            validateToken(tokens[i]);

            if (!this.contains(tokens[i])) {
                arr.push.call(this, tokens[i]);

                this.length = toArray(this).length;
            }
        }

        if (this.element) {
            this.element[this.prop] = this.toString();
        }
    };

    DOMTokenList.prototype.contains = function (token) {
        validateToken(token);

        return inArray(this, token) !== -1;
    };

    DOMTokenList.prototype.item = function (index) {
        return this[index] || null;
    };

    DOMTokenList.prototype.remove = function () {
        var i;
        var key;
        var tokens = toArray(arguments);

        for (i = 0; i < tokens.length; i++) {
            validateToken(tokens[i]);

            key = inArray(this, tokens[i]);

            if (key !== -1) {
                arr.splice.call(this, key, 1);

                this.length = toArray(this).length;
            }
        }

        if (this.element) {
            this.element[this.prop] = this.toString();
        }
    };

    DOMTokenList.prototype.toggle = function (token, force) {
        validateToken(token);

        if (!this.contains(token) && force === false) {
            return false;
        }

        if (this.contains(token)) {
            if (!force) {
                this.remove(token);
                return false;
            }

            return true;
        }

        this.add(token);

        return true;
    };

    DOMTokenList.prototype.toString = function () {
        return arr.join.call(this, ' ');
    };

    window.DOMTokenList = DOMTokenList;
}(window));

;(function () {
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

;(function () {
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
