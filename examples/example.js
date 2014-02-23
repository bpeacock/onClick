var click = require("../src/onClick.js");

click({
    '#element': function(e) {
        alert("You clicked!");
    }
});

