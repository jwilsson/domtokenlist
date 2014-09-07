;(function (window) {
    'use strict';

    if ('DOMTokenList' in window) {
        return;
    }

    var inArray = function (array, value) {
        var i;

        for (i = 0; i < array.length; i++) {
            if (array[i] === value) {
                return i;
            }
        }

        return -1;
    };

    var toArray = function (object) {
        return [].slice.call(object);
    };

    var validateToken = function (token) {
        var whitespace = /[\u0009\u000A\u000C\u000D\u0020]/;

        if (token === '' || whitespace.test(token)) {
            throw new Error('Token must not be empty or contain whitespace.');
        }
    };

    var DOMTokenList = function (element, attribute) {
        var i;
        var values = [];

        if (element && attribute) {
            this.element = element;
            this.attribute = attribute;

            values = this.element.getAttribute(this.attribute).replace(/^\s+|\s+$/g,'').split(/\s+/);

            for (i = 0; i < values.length; i++) {
                this[i] = values[i];
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
                [].push.call(this, tokens[i]);

                this.length = toArray(this).length;
            }
        }

        if (this.element) {
            this.element.setAttribute(this.attribute, this.toString());
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
                [].splice.call(this, key, 1);

                this.length = toArray(this).length;
            }
        }

        if (this.element) {
            this.element.setAttribute(this.attribute, this.toString());
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
        return [].join.call(this, ' ');
    };

    window.DOMTokenList = DOMTokenList;
}(window));
