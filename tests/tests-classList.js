module('classList');

test('Add single class', function () {
    var testElement = document.createElement('a');

    testElement.classList.add('class-1');

    equal('class-1', testElement.className, 'Assert that element class is "class-1"');
});

test('Add multiple classes', function () {
    var testElement = document.createElement('a');

    testElement.classList.add('class-1', 'class-2');

    equal('class-1 class-2', testElement.className, 'Assert that element class is "class-1" and "class-2"');
});

test('Remove single class', function () {
    var testElement = document.createElement('a');

    testElement.classList.add('class-1', 'class-2');
    testElement.classList.remove('class-2');

    equal('class-1', testElement.className, 'Assert that element class is "class-1"');
});

test('Remove multiple classes', function () {
    var testElement = document.createElement('a');

    testElement.classList.add('class-1', 'class-2', 'class-3');
    testElement.classList.remove('class-2');

    equal('class-1 class-3', testElement.className, 'Assert that element class is "class-1" and "class-3"');
});
