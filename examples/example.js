var click = require("../src/click.js");

click({
    '#element': function(e) {
        alert("You clicked!");
    }
});

