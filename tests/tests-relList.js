module('relList');

test('Add single rel value', function () {
    var testElement = document.createElement('a');

    testElement.relList.add('external');

    equal('external', testElement.rel, 'Assert that element class is "external"');
});

test('Add multiple rel values', function () {
    var testElement = document.createElement('a');

    testElement.relList.add('external', 'nofollow');

    equal('external nofollow', testElement.rel, 'Assert that element class is "external" and "nofollow"');
});

test('Remove single rel value', function () {
    var testElement = document.createElement('a');

    testElement.relList.add('external', 'nofollow');
    testElement.relList.remove('nofollow');

    equal('external', testElement.rel, 'Assert that element class is "external"');
});

test('Remove multiple rel values', function () {
    var testElement = document.createElement('a');

    testElement.relList.add('external', 'nofollow', 'search');
    testElement.relList.remove('nofollow');

    equal('external search', testElement.rel, 'Assert that element class is "external" and "search"');
});
