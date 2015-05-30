module('DOMTokenList-newest');

test('Add multiple tokenes', function () {
    var list = document.createElement('a').classList;

    list.add('token-1', 'token-2');
    list = toArray(list);

    deepEqual(list, ['token-1', 'token-2'], 'Assert that tokens is "token-1" and "token-2".');
});

test('Test toggle force with filled token list', function () {
    var list = document.createElement('a').classList;

    list.add('token-1');

    equal(list.toggle('token-1', false), false, 'Assert that toggle returns false.');
});

test('Test toggle force = true with empty token list', function () {
    var list = document.createElement('a').classList;

    ok(list.toggle('token-1', true), 'Assert that toggle returns true.');
});

test('Test toggle force = false with empty token list', function () {
    var list = document.createElement('a').classList;
    var result = list.toggle('token-12', false);

    list = toArray(list);

    deepEqual(list, [], 'Assert that token list is empty');
    equal(result, false, 'Assert that toggle returns false.');
});
