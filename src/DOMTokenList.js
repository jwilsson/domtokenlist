;(function (window) {
    /*if ('DOMTokenList' in window) {
        return;
    }*/

    var inArray = function (array, value) {
        var i;

        for (i = 0; i < array.length; i++) {
            if (array[i] === value) {
                return i;
            }
        }

        return -1;
    };

    var isIllegal = function (token) {
        var whitespace = /[\u0009\u000A\u000C\u000D\u0020]/;

        if (token === '' || whitespace.test(token)) {
            throw new Error('Token must not be empty or contain whitespace.');
        }
    };

    var DOMTokenList2 = function () {
        this.tokens = [];
        this.length = 0;
    };

    DOMTokenList2.prototype.add = function () {
        var i;
        var tokens = [].slice.call(arguments);

        for (i = 0; i < tokens.length; i++) {
            isIllegal(tokens[i]);

            if (!this.contains(tokens[i])) {
                this.tokens.push(tokens[i]);
            }
        }
    };

    DOMTokenList2.prototype.contains = function (token) {
        isIllegal(token);

        return inArray(this.tokens, token) !== -1;
    };

    DOMTokenList2.prototype.item = function (index) {
        return this.tokens[index] || null;
    };

    DOMTokenList2.prototype.remove = function () {
        var i;
        var key;
        var tokens = [].slice.call(arguments);

        for (i = 0; i < tokens.length; i++) {
            isIllegal(tokens[i]);

            key = inArray(this.tokens, tokens[i]);

            if (key !== -1) {
                this.tokens.splice(key, 1);
            }
        }
    };

    DOMTokenList2.prototype.toggle = function (token, force) {
        isIllegal(token);

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

    DOMTokenList2.prototype.toString = function () {
        return this.tokens.join(' ');
    };

    window.DOMTokenList2 = DOMTokenList2;
}(window));
