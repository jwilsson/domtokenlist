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

    var DOMTokenList2 = function () {
        this.tokens = [];
        this.length = 0;
    };

    DOMTokenList2.prototype.add = function () {
        var i;
        var tokens = [].slice.call(arguments);

        for (i = 0; i < tokens.length; i++) {
            if (tokens[i] === '' || /\s/.test(tokens[i])) {
                throw new Error('Token must not be empty or contain whitespace.');
            }

            if (!this.contains(tokens[i])) {
                this.tokens.push(tokens[i]);
            }
        }
    };

    DOMTokenList2.prototype.contains = function (token) {
        if (token === '' || /\s/.test(token)) {
            throw new Error('Token must not be empty or contain whitespace.');
        }

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
            if (tokens[i] === '' || /\s/.test(tokens[i])) {
                throw new Error('Token must not be empty or contain whitespace.');
            }

            key = inArray(this.tokens, tokens[i]);

            if (key !== -1) {
                this.tokens.splice(key, 1);
            }
        }
    };

    DOMTokenList2.prototype.toggle = function (token, force) {
        if (token === '' || /\s/.test(token)) {
            throw new Error('Token must not be empty or contain whitespace.');
        }

        if (this.contains(token)) {
            if (!force) {
                this.remove(token);
                return false;
            }

            return true;
        }

        if (force === false) {
            return false;
        }

        this.add(token);
        return true;
    };

    DOMTokenList2.prototype.toString = function () {
        return this.tokens.join(' ');
    };

    window.DOMTokenList2 = DOMTokenList2;
}(window));
