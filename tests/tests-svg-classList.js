module('svg.classList');

test('Add single class', function () {
    var testElement;

    // Always pass if SVG isn't supported
    if (typeof SVGElement === 'undefined') {
        ok(true);

        return;
    }

    testElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    testElement.classList.add('class-1');

    var testClassName = typeof testElement.className === 'string' ? testElement.className : testElement.className.baseVal;
    equal('class-1', testClassName, 'Assert that element class is "class-1"');
});

test('Add multiple classes', function () {
    var testElement;

    // Always pass if SVG isn't supported
    if (typeof SVGElement === 'undefined') {
        ok(true);

        return;
    }

    testElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    testElement.classList.add('class-1', 'class-2');

    var testClassName = typeof testElement.className === 'string' ? testElement.className : testElement.className.baseVal;
    equal('class-1 class-2', testClassName, 'Assert that element class is "class-1" and "class-2"');
});

test('Remove single class', function () {
    var testElement;

    // Always pass if SVG isn't supported
    if (typeof SVGElement === 'undefined') {
        ok(true);

        return;
    }

    testElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    testElement.classList.add('class-1', 'class-2');
    testElement.classList.remove('class-2');

    var testClassName = typeof testElement.className === 'string' ? testElement.className : testElement.className.baseVal;
    equal('class-1', testClassName, 'Assert that element class is "class-1"');
});

test('Remove multiple classes', function () {
    var testElement;

    // Always pass if SVG isn't supported
    if (typeof SVGElement === 'undefined') {
        ok(true);

        return;
    }

    testElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    testElement.classList.add('class-1', 'class-2', 'class-3');
    testElement.classList.remove('class-2');

    var testClassName = typeof testElement.className === 'string' ? testElement.className : testElement.className.baseVal;
    equal('class-1 class-3', testClassName, 'Assert that element class is "class-1" and "class-3"');
});
