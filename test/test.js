var sinon = require('sinon'),
    click = window.onClick;

var sandbox         = sinon.sandbox.create(),
    testCallback    = sinon.spy();

click({
    '#button': testCallback
});

test("Trigger", function() {
    click.trigger('#button');
    ok(testCallback.called);
});
